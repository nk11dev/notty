import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { headersMiddleware } from '@/server/middlewares';
import collectNestedRoutes from '@/server/helpers/routing.helpers';
import authRoutes from '@/server/routes/auth.routes';
import usersRoutes from '@/server/routes/users.routes';
import foldersRoutes from '@/server/routes/folders.routes';
import notesRoutes from '@/server/routes/notes.routes';

const app = express();

app.use(logger('dev'));
app.use(headersMiddleware);
app.use(bodyParser.json());
app.use(express.static('dist/client'));

app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/notes', notesRoutes);

// App routes (used only for "production" mode for correct HMR working with client "development" mode).
if (process.env.NODE_ENV == 'production') {

  // Domain routes
  const appRoutes = require('@/app/routing/Router').appRoutes;
  const flatRoutes = collectNestedRoutes(appRoutes);

  for (const route of flatRoutes) {
    app.get(route, (_req, res) => {
      res.sendFile('dist/client/index.html', { root: '.' });
    });
  }

  // 404 route
  app.use((_req, res) => {
    res.status(404);
    res.sendFile('dist/client/index.html', { root: '.' });
  });
}

export default app;