import type { Request, Response } from 'express';

import dataSource from '@/server/api/db-orm/orm.datasource';
import SectionEntity from '@/server/api/db-orm/entities/section.entity';
import NoteEntity from '@/server/api/db-orm/entities/note.entity';

const sectionRepository = dataSource.getRepository(SectionEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getSections(_request: Request, response: Response) {

  const results = await sectionRepository.manager.query(`
    SELECT
      s.section_id,
      s.title,
      count(n.note_id)::int as notes_count
    FROM ${sectionRepository.metadata.tableName} s
    LEFT JOIN ${noteRepository.metadata.tableName} n on s.section_id = n.section_id
    GROUP BY s.section_id
    ORDER BY s.section_id ASC
  `);

  response.status(200).json({
    payload: results
  });
}

export async function getSection(request: Request, response: Response) {
  const results = await sectionRepository.findOneBy({
    section_id: Number(request.params.sectionId),
  });

  response.status(200).json({
    payload: results
  });
}

export async function createSection(request: Request, response: Response) {

  const results = await sectionRepository
    .createQueryBuilder()
    .insert()
    .values(request.body)
    .returning('*')
    .execute();

  response.status(201).json({
    payload: results.raw[0]
  });
}

export async function updateSection(request: Request, response: Response) {
  
  const [affectedRows, affectedCount] = await sectionRepository.manager.query(`
    UPDATE ${sectionRepository.metadata.tableName}
    SET 
      title = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE section_id = $2
    RETURNING *
`, [request.body.title, request.params.sectionId]);

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount
    }
  });
}

export async function deleteSection(request: Request, response: Response) {

  const [affectedRows, affectedCount] = await sectionRepository.manager.query(`
    DELETE 
    FROM ${sectionRepository.metadata.tableName} 
    WHERE section_id = $1
    RETURNING *
  `, [request.params.sectionId]);

  const [lastRow] = await sectionRepository.manager.query(`
    SELECT *
    FROM ${sectionRepository.metadata.tableName}
    ORDER BY section_id DESC
    LIMIT 1
  `);

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount,
      lastRow: lastRow
    }
  });
}