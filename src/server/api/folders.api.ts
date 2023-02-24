import express from 'express';

import { getContent } from '@/server/helpers/api.helpers';
import { Folder } from '@/entities/model/folder.types';

const router = express.Router();
const FILEPATH = 'src/data/folders.json';

router.get('/folders', (req, res) => {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      res.send(JSON.stringify({
        data: fileData
      }));
    }
  });
});

router.get('/folders/:folderId', (req, res) => {
  getContent({
    filePath: FILEPATH,
    cb: (fileData) => {
      const { folderId } = req.params;

      const folderData = fileData.filter(
        (item: Folder) => item.id.toString() === folderId.toString()
      );

      res.send(JSON.stringify({
        data: (folderData.length > 0)
          ? folderData[0]
          : {}
      }));
    }
  });
});

export default router;