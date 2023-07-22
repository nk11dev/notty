import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import { addResponseFormats } from '@/server/middlewares';
import collectNestedRoutes from '@/server/helpers/routing.helpers';
import apiRoutes from '@/server/routes';

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

// API routes
app.use('/api', apiRoutes);

if (process.env.NODE_ENV == 'production') {

  // Client app routes
  const appRoutes = require('@/app/routing/Router').appRoutes;
  const flatRoutes = collectNestedRoutes(appRoutes);

  for (const route of flatRoutes) {
    app.get(route, (_req: Request, res: Response) => {
      res.sendFile('dist/client/index.html', { root: '.' });
    });
  }

  // 404 route
  app.use((_req: Request, res: Response) => {
    res.status(404);
    res.sendFile('dist/client/index.html', { root: '.' });
  });
}

export default app;