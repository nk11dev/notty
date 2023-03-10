import express from 'express';
import logger from 'morgan';

import apiExample from '@/server/api/example/sections.api-example';
import apiDb from '@/server/api/db/sections.api';

const colors = require('ansi-colors');

const app = express();

// response headers
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(logger('dev'));
app.use(express.static('dist/client'));
app.use('/api-example', apiExample);
app.use('/api', apiDb);

// App react routes (used only for "production" mode for correct HMR working with client "development" mode).
if (process.env.NODE_ENV == 'production') {
  const appRoutes = require('@/app/routing/Router').appRoutes;

  for (const route of appRoutes) {
    app.get(route.path, (_req, res) => {
      res.sendFile('dist/client/index.html', { root: '.' });
    });
  }
}

// 404 route
app.use((_req, res) => {
  res.status(404);
  res.sendFile('dist/client/index.html', { root: '.' });
});

const PORT = process.env.PORT || process.env.PORT_SERVER;

const listener = app.listen(PORT, function () {
  console.log(colors.magenta('\n--- Express app started'), listener.address(), '\n');
});