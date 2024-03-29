import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import favicon from 'serve-favicon';

const expressStaticGzip = require('express-static-gzip');

import { HttpStatus } from '@/common/constants';

import { skipFaviconRequest, addResponseFormats, handleErrors } from '@/server/middlewares';
import apiRoutes from '@/server/routes/api';
import clientRoutes from '@/server/routes/client';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(favicon('dist/client/favicon.ico'));
} else {
  app.use(skipFaviconRequest);
}

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(addResponseFormats);
app.use(expressStaticGzip('dist/client'));

// CORS settings are used for correct sending of cookies to client dev server
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: `http://127.0.0.1:${process.env.PORT_CLIENT}`,
    credentials: true,
  }));
}

// API routes
app.use('/api', apiRoutes);

//  Client routes
for (const route of clientRoutes) {
  app.get(route, (_req: Request, res: Response) => {
    res.sendFile('dist/client/index.html', { root: '.' });
  });
}

// 404 route
app.use((_req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND);
  res.sendFile('dist/client/index.html', { root: '.' });
});

app.use(handleErrors);

export default app;