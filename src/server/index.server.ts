import express from 'express';
import logger from 'morgan';
import colors from 'ansi-colors';

import { appRoutes } from '@/app/routing/Router';
import apiFolders from '@/server/api/folders.api';

const app = express();

// response headers
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(logger('dev'));
app.use(express.static('dist/client'));
app.use('/api', apiFolders);

// app routes
for (const route of appRoutes) {
  app.get(route.path, (_req, res) => {
    res.sendFile('dist/client/index.html', { root: '.' });
  });
}

// 404 route
app.use((_req, res) => {
  res.status(404);
  res.sendFile('dist/client/index.html', { root: '.' });
});

const { PORT_SERVER } = process.env;

const listener = app.listen(PORT_SERVER, function () {
  console.log(colors.magenta('\n--- Express app started'), listener.address(), '\n');
});