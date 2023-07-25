import express from 'express';

import foldersController from '@/server/controllers/folders.controller';
import notesController from '@/server/controllers/notes.controller';

const router = express.Router();

router

  // routes for folders
  .get('/', foldersController.getAllFolders)
  .get('/:folderSlug', foldersController.getOneFolder)
  .post('/', foldersController.createFolder)
  .put('/:folderSlug', foldersController.updateFolder)
  .delete('/:folderSlug', foldersController.deleteFolder)

  // routes for notes, where specified folder id is required
  .get('/:folderSlug/notes', notesController.getAllNotes)
  .post('/:folderSlug/notes', notesController.createNote);

export default router;