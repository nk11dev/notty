import type { Request, Response } from 'express';

import dataSource from '@/server/api/datasource';
import FolderEntity from '@/server/api/entities/folder.entity';
import NoteEntity from '@/server/api/entities/note.entity';

const folderRepository = dataSource.getRepository(FolderEntity);
const noteRepository = dataSource.getRepository(NoteEntity);

export async function getAllFolders(_request: Request, response: Response) {

  const results = await folderRepository.manager.query(`
    SELECT
      s.id,
      s.title,
      count(n.id)::int as notes_count
    FROM ${folderRepository.metadata.tableName} s
    LEFT JOIN ${noteRepository.metadata.tableName} n on s.id = n.folder_id
    GROUP BY s.id
    ORDER BY s.id ASC
  `);

  response.status(200).json({
    payload: results
  });
}

export async function getFolder(request: Request, response: Response) {
  const { folderSlug } = request.params;

  const results = await folderRepository
    .createQueryBuilder('f')
    .leftJoinAndSelect('f.notes', 'n')
    .orderBy('n.id', 'ASC')
    .where(`f.id = :id`, { id: folderSlug })
    .getOne();

  if (!results) {
    response.status(404).send('Folder is not found');

  } else {
    response.status(200).json({
      payload: results
    });
  }
}

export async function createFolder(request: Request, response: Response) {

  const results = await folderRepository
    .createQueryBuilder()
    .insert()
    .values(request.body)
    .returning('*')
    .execute();

  response.status(201).json({
    payload: results.raw[0]
  });
}

export async function updateFolder(request: Request, response: Response) {

  const [affectedRows, affectedCount] = await folderRepository.manager.query(`
    UPDATE ${folderRepository.metadata.tableName}
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

export async function deleteFolder(request: Request, response: Response) {

  const [affectedRows, affectedCount] = await folderRepository.manager.query(`
    DELETE 
    FROM ${folderRepository.metadata.tableName} 
    WHERE id = $1
    RETURNING *
  `, [request.params.folderSlug]);

  const [lastRow] = await folderRepository.manager.query(`
    SELECT *
    FROM ${folderRepository.metadata.tableName}
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