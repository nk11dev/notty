<div align="center">
  <img width="160" src="/src/assets/images/notty_logo.png">
</div>

<div align="center">
  <div>✨ A web app for creating notes and organizing information ✨</div>
  <a href="https://notty.onrender.com">https://notty.onrender.com</a>
</div>

##  🍦 Features
- Authentication (JWT)
- Folders
- Bookmarks
- Rich text editor
- Autosave
- Mobile-friendly UI

## 🚀 Tech Stack
- Languages: [TypeScript](https://www.typescriptlang.org/), [SASS](https://sass-lang.com/)
- Bundler: [Webpack](https://webpack.js.org/)
- Frontend: [React](https://react.dev/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/), [Tiptap](https://tiptap.dev/)
- Backend: [Express](https://expressjs.com), [PostgreSQL](https://www.postgresql.org/), [TypeORM](https://typeorm.io/)

## 🛠️ For developers

### 📑 Requirements
- Node.js (minimum supported version is 18.12.0)
- NPM (minimum supported version is 8.19.2)
- PostgreSQL

### ⚙️ Environment variables
- This app uses [dotenv-defaults](https://www.npmjs.com/package/dotenv-defaults) for loading environment variables.
- Available variables can be found in the *"/.env.defaults"* file.
- Values can be specified by creating the *"/.env"* file.

### 💻 NPM Scripts

#### Installation
- `npm install` / `yarn` Install NPM dependencies.

#### Development
- `npm run dev:client` / `npm run dev` Run client-side app by *"webpack-dev-server"* with HMR (by default available at [localhost:3000](http://localhost:3000)).

- `npm run dev:server` Run server-side app by *"nodemon-webpack-plugin"* with *"watch"* flag (by default available at [localhost:3001](http://localhost:3001)).

#### Build & Production
- `npm run build:client` Build client to *"/dist/client/"* folder.

- `npm run build:server` Build server to *"/dist/server.js"* file.

- `npm start` Start *"/dist/server.js"* and host static files from *"/dist/client/"* folder.

- `npm run prod` Sequentially run the `build client`, `build:server` and `start` commands.

#### DB
-  `npm run typeorm:cli` - Helper command for using the TypeORM CLI. 

- `npm run typeorm:cli:ds` - Helper command for using the TypeORM datasource. 

- `npm run migr:gen` Generate migration files with the changes to synchronize the database schema with the current enitites.

- `npm run migr:gen:initial` Helper command with predefined generation of *"create-initial-tables"* migration.

- `npm run migr:create` Generate a migration file that contains the current timestamp when the migration was generated. Used for manual migration writing.

- `npm run migr:show` Show all migrations and whether they've been run or not.

- `npm run migr:run` Execute all pending migrations.

- `npm run migr:revert` Revert the most recently executed migrations.

- `npm run schema:log` Show SQL queries that need to be applied to synchronize the database schema with the current entities.
 
- `npm run schema:drop` Completely drop a database schema.

#### Linting
- `npm run lint` Check for ESLint errors.

- `npm run lint:fix` Fix ESLint errors.

- `npm run ts:check` Check for TypeScript errors.

#### Bundle analyzing
- `npm run analyze:client` Run *"webpack-bundle-analyzer"*: HTTP server to show client-side bundle report with visualized size of webpack output files.

- `npm run analyze:server` Run *"webpack-bundle-analyzer"*: HTTP server to show server-side bundle report with visualized size of webpack output files.