import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { addResponseFormats } from '@/server/middlewares';
import collectNestedRoutes from '@/server/helpers/routing.helpers';
import authRoutes from '@/server/routes/auth.routes';
import usersRoutes from '@/server/routes/users.routes';
import foldersRoutes from '@/server/routes/folders.routes';
import notesRoutes from '@/server/routes/notes.routes';

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(addResponseFormats);
app.use(express.static('dist/client'));

// CORS settings are used for correct sending of cookies to client dev server
if (process.env.NODE_ENV == 'development') {
  app.use(cors({
    origin: `http://127.0.0.1:${process.env.PORT_CLIENT}`,
    credentials: true,
  }));
}

app.use('/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/folders', foldersRoutes);
app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV == 'production') {

  // Client app routes
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