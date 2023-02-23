import express from 'express';

import { getContent } from '@/server/helpers/api.helpers';

const router = express.Router();

router.get('/folders', (req, res) => {
  getContent({
    filePath: 'src/data/folders.json',
    cb: (jsonData) => {
      res.send(JSON.stringify(jsonData));
    }
  })
});

export default router;