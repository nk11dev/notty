import express from 'express';
import { Pool, QueryResult, } from 'pg';

import { formatColumnTime } from '@/server/helpers/db.helpers';

const { env } = process;

const pool = new Pool({
  host: env.PG_HOST,
  port: parseInt(env.PG_PORT, 10),
  database: env.PG_DATABASE,
  user: env.PG_USER,
  password: env.PG_PASS
});

const router = express.Router();

router.get('/sections', (_req, response) => {
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
    response.status(200).json(results.rows);
  })
});

export default router;