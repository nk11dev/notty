import type { Request, Response } from 'express';

import dataSource from '@/server/api/db-orm/orm.datasource';
import SectionEntity from '@/server/api/db-orm/entities/section.entity';
import NoteEntity from '@/server/api/db-orm/entities/note.entity';

const sectionRepository = dataSource.getRepository(SectionEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getNotes(request: Request, response: Response) {
  const { sectionId } = request.params;

  let queryBuilder = noteRepository.createQueryBuilder();

  if (sectionId) {
    queryBuilder = queryBuilder.where("section_id = :id", { id: sectionId })
  }

  const result = await queryBuilder.getMany();

  response.status(200).json({
    payload: result
  });
}

export async function getNote(request: Request, response: Response) {

  console.log('\n');
  console.log('getNote()');
  console.log('request.params:', request.params);
  console.log('\n');

  const results = await noteRepository.findOneBy({
    note_id: Number(request.params.noteId),
  });

  response.status(200).json({
    payload: results
  });
}

export async function createNote(request: Request, response: Response) {
  const { sectionId } = request.params;

  const section = await sectionRepository.findOneBy({
    section_id: Number(sectionId),
  });

  if (!section) {
    response.status(400).json({
      error: `Cannot create note.`,
      message: `Foreign key constraint preasumable violation: 'section_id' = '${sectionId}' doesn't exist in 'sections' table.`
    });

  } else {
    const note = noteRepository.create({
      ...request.body,
      section_id: sectionId
    });
    const results = await noteRepository.save(note);

    response.status(201).json({
      payload: results
    });
  }
}

export async function updateNote(request: Request, response: Response) {
  const { title, body } = request.body;

  const [affectedRows, affectedCount] = await noteRepository.manager.query(`
    UPDATE ${noteRepository.metadata.tableName}
    SET 
      title = $1,
      body = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE note_id = $3
    RETURNING *
`, [title, body, request.params.noteId]);

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount
    }
  });
}

export async function deleteNote(request: Request, response: Response) {
  const [affectedRows, affectedCount] = await noteRepository.manager.query(`
    DELETE 
    FROM ${noteRepository.metadata.tableName} 
    WHERE note_id = $1
    RETURNING *
  `, [request.params.noteId]);

  response.status(200).json({
    payload: {
      affectedRows,
      affectedCount
    }
  });
}