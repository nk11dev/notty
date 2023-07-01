import express from 'express';

import FoldersController from '@/server/controllers/folders.controller';

import NotesController from '@/server/controllers/notes.controller';

const router = express.Router();

router
  // routes for folders
  .get('/', FoldersController.getAllFolders)
  .get('/:folderSlug', FoldersController.getOneFolder)
  .post('/', FoldersController.createFolder)
  .put('/:folderSlug', FoldersController.updateFolder)
  .delete('/:folderSlug', FoldersController.deleteFolder)

  // routes for notes, where specified folder id is required
  .get('/:folderSlug/notes', NotesController.getAllNotes)
  .post('/:folderSlug/notes', NotesController.createNote)

export default router;