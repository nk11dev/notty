import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import collectNestedRoutes from '@/server/helpers/routing.helpers';
import api from '@/server/routing/routes.api-db-orm';

const colors = require('ansi-colors');

const app = express();

// Response headers
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('dist/client'));

// API routes
app.use('/api', api);

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