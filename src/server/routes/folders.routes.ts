import express from 'express';

import FoldersController from '@/server/controllers/folders.controller';
import NotesController from '@/server/controllers/notes.controller';
import { verifyToken } from '@/server/middlewares';

const router = express.Router();

router
  // routes for folders
  .get('/',
    verifyToken,
    FoldersController.getAllFolders
  )

  .get('/:folderSlug',
    verifyToken,
    FoldersController.getOneFolder
  )

  .post('/',
    verifyToken,
    FoldersController.createFolder
  )

  .put('/:folderSlug', FoldersController.updateFolder)
  .delete('/:folderSlug', FoldersController.deleteFolder)

  // routes for notes, where specified folder id is required
  .get('/:folderSlug/notes', NotesController.getAllNotes)

  .post('/:folderSlug/notes',
    verifyToken,
    NotesController.createNote
  );

export default router;