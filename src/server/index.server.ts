import express from 'express';

console.log('\n---');
console.log('index.server.ts');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('<h1>Express</h1>');
});

app.listen(PORT, function () {
  console.log(`Express app listening at http://localhost:${PORT}`);
});