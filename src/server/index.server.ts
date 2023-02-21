import express from 'express';
import logger from 'morgan';

console.log('\n---');
console.log('index.server.ts');

const app = express();
app.use(logger('dev'));

const PORT = 3001;

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  res.sendFile('dist/client/index.html', { root: '.' });
});

app.listen(PORT, function () {
  console.log(`Express app listening at http://localhost:${PORT}`);
});