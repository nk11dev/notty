import { Pool, } from 'pg';
import type { QueryResult, } from 'pg';
import type { Request, Response } from 'express';

import poolConfig from '@/server/api/db-sql/pool.config'
import { formatColumnTime } from '@/server/helpers/db-sql.helpers';

const pool = new Pool(poolConfig);

export function getSections(_request: Request, response: Response) {
  const query = `
  SELECT 
    section_id, 
    title, 
    ${formatColumnTime('created_at')}, 
    ${formatColumnTime('updated_at')}
  FROM sections
  ORDER BY section_id ASC
  `;

  pool.query(query, (error: Error, results: QueryResult) => {
    if (error) throw error;

    response.status(200).json({
      payload: results.rows
    });
  });
}

export function getSection(_request: Request, response: Response) {
  response.status(200).json({
    payload: []
  });
}

export function createSection(request: Request, response: Response) {
  const { title } = request.body;

  const titleWithCounter = `concat('New section ', (SELECT DISTINCT COUNT(*) FROM sections WHERE updated_at IS NULL) + 1)`;

  const query = `
  INSERT INTO sections (title, created_at, updated_at) 
  VALUES (
    ${title ? ("'" + title + "'") : titleWithCounter}, 
    current_timestamp,
    ${title ? 'current_timestamp' : 'NULL'}
  ) 
  RETURNING *
  `;

  pool.query(query, (error: Error, results: QueryResult) => {
    if (error) throw error;

    response.status(201).json({
      payload: results.rows
    });
  });
}

export function updateSection(request: Request, response: Response) {
  const { sectionId } = request.params;
  const { title } = request.body;

  const query = `
  UPDATE sections
  SET 
    title = $1,
    updated_at = current_timestamp
  WHERE section_id = $2
  RETURNING *
  `;

  pool.query(
    query,
    [title, sectionId],
    (error: Error, results: QueryResult) => {
      if (error) throw error;

      response.status(200).json({
        payload: results.rows
      });
    });
}

export function deleteSection(request: Request, response: Response) {
  const { sectionId } = request.params;

  const query = `
  DELETE 
  FROM sections 
  WHERE section_id = $1
  `;

  pool.query(
    query,
    [sectionId],
    (error: Error) => {
      if (error) throw error;

      response.status(200).json({
        payload: `Section deleted with section_id: ${sectionId}`
      });
    });
}