import express from 'express';

import NotesController from '@/server/controllers/notes.controller';

const router = express.Router();

router
  // routes for notes without specified folder id
  .get('/', NotesController.getAllNotes)
  .get('/:noteSlug', NotesController.getOneNote)
  .put('/:noteSlug', NotesController.updateNote)
  .delete('/:noteSlug', NotesController.deleteNote);

export default router;