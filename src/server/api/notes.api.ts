import type { Request, Response } from 'express';

import dataSource from '@/server/api/datasource';
import FolderEntity from '@/server/api/entities/folder.entity';
import NoteEntity from '@/server/api/entities/note.entity';

const folderRepository = dataSource.getRepository(FolderEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getNotes(request: Request, response: Response) {
  const { folderSlug } = request.params;
  const { filterByIsBookmark } = request.query;

  const result = await noteRepository
    .createQueryBuilder()
    .orderBy('id', 'ASC')

    .andWhere(folderSlug
      ? `folder_id = :id`
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
    .createQueryBuilder('n')
    .leftJoinAndSelect('n.section', 'f')
    .where(`n.id = :id`, { id: noteSlug })
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

  const relatedFolder = await folderRepository.findOneBy({
    id: Number(folderSlug),
  });

  if (!relatedFolder) {
    response.status(400).json({
      error: `Cannot create note.`,
      message: `Foreign key constraint preasumable violation: Folder with 'id' = '${folderSlug}' doesn't exist in 'sections' table.`
    });

  } else {

    const results = await noteRepository
      .createQueryBuilder()
      .insert()
      .values({
        ...request.body,
        folder_id: folderSlug
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
    .where('id = :id', { id: request.params.noteSlug })
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
    WHERE id = $1
    RETURNING *
  `, [request.params.noteSlug]);

  let lastRow = null;

  if (affectedCount > 0) {
    const { folder_id } = affectedRows[0];

    const [result] = await noteRepository
      .createQueryBuilder()

      // If note is related to some folder, then get last note from this folder. Else - get last "unsorted" note. 
      .andWhere(folder_id
        ? `folder_id = :folder_id`
        : '1=1',
        { folder_id })

      .orderBy('id', 'DESC')
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