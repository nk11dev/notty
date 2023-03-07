import express from 'express';

import { getContent } from '@/server/helpers/api.helpers';
import { Folder } from '@/entities/model/folder.types';

const router = express.Router();
const FILEPATH = 'src/data/sections.example.json';

router.get('/sections', (_req, res) => {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      res.send(JSON.stringify({
        payload: fileData
      }));
    }
  });
});

router.get('/sections/:sectionId', (req, res) => {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      const { sectionId } = req.params;

      const itemData = fileData.filter(
        (item: Folder) => item.id.toString() === sectionId.toString()
      );

      res.send(JSON.stringify({
        payload: (itemData.length > 0)
          ? itemData[0]
          : {}
      }));
    }
  });
});

export default router;