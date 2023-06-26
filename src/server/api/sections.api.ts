import type { Request, Response } from 'express';

import dataSource from '@/server/api/datasource';
import SectionEntity from '@/server/api/entities/section.entity';
import NoteEntity from '@/server/api/entities/note.entity';

const sectionRepository = dataSource.getRepository(SectionEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getSections(_request: Request, response: Response) {

  const results = await sectionRepository.manager.query(`
    SELECT
      s.id,
      s.title,
      count(n.id)::int as notes_count
    FROM ${sectionRepository.metadata.tableName} s
    LEFT JOIN ${noteRepository.metadata.tableName} n on s.id = n.folder_id
    GROUP BY s.id
    ORDER BY s.id ASC
  `);

  response.status(200).json({
    payload: results
  });
}

export async function getSection(request: Request, response: Response) {
  const { folderSlug } = request.params;

  const results = await sectionRepository
    .createQueryBuilder('section')
    .leftJoinAndSelect('section.notes', 'note')
    .orderBy('note.id', 'ASC')
    .where(`section.id = :id`, { id: folderSlug })
    .getOne();

  if (!results) {
    response.status(404).send('Section is not found');

  } else {
    response.status(200).json({
      payload: results
    });
  }
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
    WHERE id = $2
    RETURNING *
`, [request.body.title, request.params.folderSlug]);

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
    WHERE id = $1
    RETURNING *
  `, [request.params.folderSlug]);

  const [lastRow] = await sectionRepository.manager.query(`
    SELECT *
    FROM ${sectionRepository.metadata.tableName}
    ORDER BY id DESC
    LIMIT 1
  `);

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount,
      lastRow: lastRow || null
    }
  });
}