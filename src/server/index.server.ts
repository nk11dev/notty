import express from 'express';
import logger from 'morgan';

import { appRoutes } from '@/app/routing/Router';

console.log('\n---');
console.log('index.server.ts');

const app = express();
app.use(logger('dev'));

const PORT = 3001;

app.use(express.static('dist/client'));

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
  console.log(`Express app listening at http://localhost:${PORT}`);
});