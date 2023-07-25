import express from 'express';

import foldersController from '@/server/controllers/folders.controller';
import notesController from '@/server/controllers/notes.controller';
import { verifyToken } from '@/server/middlewares';

const router = express.Router();

router

  // routes for folders
  .get('/',
    verifyToken,
    foldersController.getAllFolders
  )

  .get('/:folderSlug',
    verifyToken,
    foldersController.getOneFolder
  )

  .post('/',
    verifyToken,
    foldersController.createFolder
  )

  .put('/:folderSlug', foldersController.updateFolder)

  .delete('/:folderSlug',
    verifyToken,
    foldersController.deleteFolder
  )

  // routes for notes, where specified folder id is required
  .get('/:folderSlug/notes', notesController.getAllNotes)

  .post('/:folderSlug/notes',
    verifyToken,
    notesController.createNote
  );

export default router;