import type { Request, Response } from 'express';

import dataSource from '@/server/api/db-orm/orm.datasource';
import { Section } from '@/server/api/db-orm/entities/section.entity';

const sectionRepository = dataSource.getRepository(Section);

export async function getSections(_request: Request, response: Response) {
  const sections = await sectionRepository.find({
    order: {
      section_id: "ASC"
    }
});

  response.status(200).json({
    payload: sections
  });
}

export function getSection(_request: Request, response: Response) {
  response.status(200).json({
    payload: []
  });
}

export async function createSection(request: Request, response: Response) {
  const section = sectionRepository.create(request.body);
  const results = await sectionRepository.save(section);

  response.status(201).json({
    payload: results
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

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount
    }
  });
}