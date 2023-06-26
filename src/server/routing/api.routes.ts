import express from 'express';

import {
  getSections,
  getSection,
  createSection,
  deleteSection,
  updateSection
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
  .get('/sections', getSections)
  .get('/sections/:folderSlug', getSection)
  .post('/sections', createSection)
  .put('/sections/:folderSlug', updateSection)
  .delete('/sections/:folderSlug', deleteSection)

  // notes (for specified section)
  .get('/sections/:folderSlug/notes', getNotes)
  .post('/sections/:folderSlug/notes', createNote)

  // notes (common)
  .get('/notes', getNotes)
  .get('/notes/:noteId', getNote)
  .put('/notes/:noteId', updateNote)
  .delete('/notes/:noteId', deleteNote);

export default router;