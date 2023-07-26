import express from 'express';

import notesController from '@/server/controllers/notes.controller';

const router = express.Router();

router

  // routes for notes without specified folder id
  .get('/', notesController.getAllNotes)

  .get('/:noteSlug',
    notesController.findNote,
    notesController.checkNoteAccess,
    notesController.getNote
  )

  .put('/:noteSlug',
    notesController.findNote,
    notesController.checkNoteAccess,
    notesController.updateNote
  )

  .delete('/:noteSlug',
    notesController.findNote,
    notesController.checkNoteAccess,
    notesController.deleteNote
  );

export default router;