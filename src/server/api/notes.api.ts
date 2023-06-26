import type { Request, Response } from 'express';

import dataSource from '@/server/api/datasource';
import SectionEntity from '@/server/api/entities/section.entity';
import NoteEntity from '@/server/api/entities/note.entity';

const sectionRepository = dataSource.getRepository(SectionEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getNotes(request: Request, response: Response) {
  const { folderSlug } = request.params;
  const { filterByIsBookmark } = request.query;

  const result = await noteRepository
    .createQueryBuilder()
    .orderBy('note_id', 'ASC')

    .andWhere(folderSlug
      ? `section_id = :id`
      : '1=1',
      { id: folderSlug })

    .andWhere((typeof filterByIsBookmark !== 'undefined')
      ? 'is_bookmark = :value'
      : '1=1',
      { value: filterByIsBookmark })

    .getMany();

  response.status(200).json({
    payload: result
  });
}

export async function getNote(request: Request, response: Response) {
  const { noteSlug } = request.params;

  const results = await noteRepository
    .createQueryBuilder('note')
    .leftJoinAndSelect('note.section', 'section')
    .where(`note.note_id = :note_id`, { note_id: noteSlug })
    .getOne();

  if (!results) {
    response.status(404).send('Note is not found');

  } else {
    response.status(200).json({
      payload: results
    });
  }
}

export async function createNote(request: Request, response: Response) {
  const { folderSlug } = request.params;

  const section = await sectionRepository.findOneBy({
    section_id: Number(folderSlug),
  });

  if (!section) {
    response.status(400).json({
      error: `Cannot create note.`,
      message: `Foreign key constraint preasumable violation: 'section_id' = '${folderSlug}' doesn't exist in 'sections' table.`
    });

  } else {

    const results = await noteRepository
      .createQueryBuilder()
      .insert()
      .values({
        ...request.body,
        section_id: folderSlug
      })
      .returning('*')
      .execute();

    response.status(201).json({
      payload: results.raw[0]
    });
  }
}

export async function updateNote(request: Request, response: Response) {
  const result = await noteRepository
    .createQueryBuilder()
    .update()
    .set({
      ...request.body,
      updated_at: new Date(),
    })
    .where('note_id = :note_id', { note_id: request.params.noteSlug })
    .returning('*')
    .execute();

  const { raw, affected } = result || {};

  response.status(200).json({
    payload: {
      affectedRows: raw[0] || null,
      affectedCount: affected
    }
  });
}

export async function deleteNote(request: Request, response: Response) {
  const [affectedRows, affectedCount] = await noteRepository.manager.query(`
    DELETE 
    FROM ${noteRepository.metadata.tableName} 
    WHERE note_id = $1
    RETURNING *
  `, [request.params.noteSlug]);

  let lastRow = null;

  if (affectedCount > 0) {
    const { section_id } = affectedRows[0];

    const [result] = await noteRepository
      .createQueryBuilder()

      // If note belongs to section then get last note from this section. Else - get last "unsorted" note. 
      .andWhere(section_id
        ? `section_id = :section_id`
        : '1=1',
        { section_id })

      .orderBy('note_id', 'DESC')
      .limit(1)
      .getMany();

    if (result) {
      lastRow = result;
    }
  }

  response.status(200).json({
    payload: {
      affectedCount,
      affectedRow: affectedRows[0] || null,
      lastRow
    }
  });
}