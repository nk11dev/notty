import express from 'express';

import {
  getAllFolders,
  getFolder,
  createFolder,
  deleteFolder,
  updateFolder
} from '@/server/api/folders.api';

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '@/server/api/notes.api';

const router = express.Router();


router
  // folders
  .get('/folders', getAllFolders)
  .get('/folders/:folderSlug', getFolder)
  .post('/folders', createFolder)
  .put('/folders/:folderSlug', updateFolder)
  .delete('/folders/:folderSlug', deleteFolder)

  // notes (for specified folder)
  .get('/folders/:folderSlug/notes', getNotes)
  .post('/folders/:folderSlug/notes', createNote)

  // notes (common)
  .get('/notes', getNotes)
  .get('/notes/:noteSlug', getNote)
  .put('/notes/:noteSlug', updateNote)
  .delete('/notes/:noteSlug', deleteNote);

export default router;