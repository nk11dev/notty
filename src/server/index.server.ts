import express from 'express';
import logger from 'morgan';

import { appRoutes } from '@/app/routing/Router';
import apiFolders from '@/server/api/folders.api';

console.log('\n---');
console.log('index.server.ts');

const PORT = 3001;
const app = express();

// response headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(logger('dev'));
app.use(express.static('dist/client'));
app.use('/api', apiFolders);

// app routes
for (const route of appRoutes) {
  app.get(route.path, (req, res) => {
    res.sendFile('dist/client/index.html', { root: '.' });
  });
}

// 404 route
app.use((req, res) => {
  res.status(404);
  res.sendFile('dist/client/index.html', { root: '.' });
});

app.listen(PORT, function () {
  console.log(`Express app listening at http://localhost:${PORT}\n`);
});