import express from 'express';

import {
  getAllFolders,
  getFolder,
  createFolder,
  deleteFolder,
  updateFolder
} from '@/server/api/sections.api';

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '@/server/api/notes.api';

const router = express.Router();


router
  // sections
  .get('/sections', getAllFolders)
  .get('/sections/:folderSlug', getFolder)
  .post('/sections', createFolder)
  .put('/sections/:folderSlug', updateFolder)
  .delete('/sections/:folderSlug', deleteFolder)

  // notes (for specified section)
  .get('/sections/:folderSlug/notes', getNotes)
  .post('/sections/:folderSlug/notes', createNote)

  // notes (common)
  .get('/notes', getNotes)
  .get('/notes/:noteSlug', getNote)
  .put('/notes/:noteSlug', updateNote)
  .delete('/notes/:noteSlug', deleteNote);

export default router;