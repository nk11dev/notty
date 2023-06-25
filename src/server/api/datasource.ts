import { DataSource } from 'typeorm';

import SectionEntity from '@/server/api/entities/section.entity';
import NoteEntity from '@/server/api/entities/note.entity';

const { env } = process;

const migrationsExt = (process.env.NODE_ENV === 'migration')

  // NODE_ENV 'migration' is settled in npm scripts, that runs typeorm CLI by 'ts-node', so it consumes '.ts' modules
  ? 'ts'

  // TypeOrm is working in a JavaScript environment, so it’s going to work on our '.ts' files once they are compiled in '.js'
  : 'js';

const dataSource = new DataSource({
  type: 'postgres',
  host: env.PG_HOST,
  port: parseInt(env.PG_PORT, 10),
  username: env.PG_USER,
  password: env.PG_PASS,
  database: env.PG_DATABASE,
  entities: [
    SectionEntity,
    NoteEntity,
  ],
  synchronize: false,
  logging: false,
  migrations: [
    `./src/server/api/migrations/**/*.${migrationsExt}`,
  ],
});

dataSource
  .initialize()
  .then(() => {
    console.log('--- Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('--- Error during Data Source initialization:', err);
  });

export default dataSource;