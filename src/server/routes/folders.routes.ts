import express from 'express';

import foldersController from '@/server/controllers/folders.controller';
import notesController from '@/server/controllers/notes.controller';

const router = express.Router();

router

  // routes for folders
  .get('/', foldersController.getAllFolders)
  .post('/', foldersController.createFolder)

  .get('/:folderSlug',
    foldersController.findFolder,
    foldersController.checkFolderAccess,
    foldersController.getFolder,
  )

  .put('/:folderSlug',
    foldersController.findFolder,
    foldersController.checkFolderAccess,
    foldersController.updateFolder,
  )

  .delete('/:folderSlug',
    foldersController.findFolder,
    foldersController.checkFolderAccess,
    foldersController.deleteFolder,
  )

  // routes for notes, where specified folder id is required
  .get('/:folderSlug/notes', notesController.getAllNotes)
  .post('/:folderSlug/notes', notesController.createNote);

export default router;