import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { headersMiddleware } from '@/server/middlewares';
import collectNestedRoutes from '@/server/helpers/routing.helpers';
import foldersRoutes from '@/server/routes/folders.routes';
import notesRoutes from '@/server/routes/notes.routes';

const colors = require('ansi-colors');

const app = express();

app.use(logger('dev'));
app.use(headersMiddleware);
app.use(bodyParser.json());
app.use(express.static('dist/client'));

// API routes
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

const PORT = process.env.PORT || process.env.PORT_SERVER;

const listener = app.listen(PORT, function () {
  console.log(colors.magenta('\n--- Express app started'), listener.address(), '\n');
});