import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Section } from '@/server/api/db-orm/entities/section.entity';

const { env } = process;

const dataSource = new DataSource({
  type: 'postgres',
  host: env.PG_HOST,
  port: parseInt(env.PG_PORT, 10),
  username: env.PG_USER,
  password: env.PG_PASS,
  database: env.PG_DATABASE,
  entities: [Section],
  synchronize: false,
  logging: false,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default dataSource;