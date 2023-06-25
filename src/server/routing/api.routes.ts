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
  .get('/sections/:sectionId', getSection)
  .post('/sections', createSection)
  .put('/sections/:sectionId', updateSection)
  .delete('/sections/:sectionId', deleteSection)

  // notes (for specified section)
  .get('/sections/:sectionId/notes', getNotes)
  .post('/sections/:sectionId/notes', createNote)

  // notes (common)
  .get('/notes', getNotes)
  .get('/notes/:noteId', getNote)
  .put('/notes/:noteId', updateNote)
  .delete('/notes/:noteId', deleteNote);

export default router;