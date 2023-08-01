import { DataSource } from 'typeorm';

import FolderEntity from '@/server/orm/entities/folder.entity';
import NoteEntity from '@/server/orm/entities/note.entity';
import UserEntity from '@/server/orm/entities/user.entity';

const { env } = process;

const migrationsExt = (process.env.NODE_ENV === 'migration')

  // NODE_ENV 'migration' is settled in npm scripts, that runs typeorm CLI by 'ts-node', so it consumes '.ts' modules
  ? 'ts'

  // TypeOrm is working in a JavaScript environment, so it’s going to work on our '.ts' files once they are compiled in '.js'
  : 'js';

const dataSource = new DataSource({
  type: 'postgres',
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  username: env.PG_USER,
  password: env.PG_PASS,
  database: env.PG_DATABASE,
  entities: [
    FolderEntity,
    NoteEntity,
    UserEntity,
  ],
  synchronize: false,
  logging: false,
  migrations: [
    `./src/server/orm/migrations/**/*.${migrationsExt}`,
  ],
  migrationsTransactionMode: 'each',
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