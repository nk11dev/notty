import express from 'express';

import notesController from '@/server/controllers/notes.controller';

const router = express.Router();

router
  // routes for notes without specified folder id
  .get('/', notesController.getAllNotes)
  .get('/:noteSlug', notesController.getOneNote)
  .put('/:noteSlug', notesController.updateNote)
  .delete('/:noteSlug', notesController.deleteNote);

export default router;