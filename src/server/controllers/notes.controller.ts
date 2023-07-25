import type { Request, Response } from 'express';

import { safeAsync } from '@/server/helpers/errors.helpers';
import NotesService from '@/server/services/notes.service';
import FoldersService from '@/server/services/folders.service';
import type { TokenData } from '@/server/types/token.types';

export default {

  getAllNotes: safeAsync(async (req: Request, res: Response) => {
    const folderId = Number(req.params.folderSlug);
    const result = await NotesService.getAllNotes(folderId, req.query);

    res.sendSuccess(200, result);
  }),

  getOneNote: safeAsync(async (req: Request, res: Response) => {
    const noteId = Number(req.params.noteSlug);
    const result = await NotesService.getOneNote(noteId);

    if (!result) {
      res.sendError(404, {
        message: 'Note not found'
      });

    } else {
      res.sendSuccess(200, result);
    }
  }),

  createNote: safeAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.tokenData as TokenData;
    const folderId = Number(req.params.folderSlug);

    const relatedFolder = await FoldersService.findFolder(folderId);

    if (!relatedFolder) {
      res.sendError(400, {
        message: `Note not created: foreign key constraint preasumable violation. Folder with 'id' = '${folderId}' doesn't exist in 'folders' table.`
      });

    } else {
      const result = await NotesService.createNote({
        ...req.body,
        user_id: userId,
        folder_id: folderId,
      });

      res.sendSuccess(201, result);
    }
  }),

  updateNote: safeAsync(async (req: Request, res: Response) => {
    const noteId = Number(req.params.noteSlug);

    const result = await NotesService.updateNote(noteId, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(200, {
      affectedRow: raw[0] || null,
      affectedCount: affected
    });
  }),

  deleteNote: safeAsync(async (req: Request, res: Response) => {
    const noteId = Number(req.params.noteSlug);

    const [affectedRows, affectedCount] = await NotesService.deleteNote(noteId);

    let lastRow = null;

    if (affectedCount > 0) {
      const lastNote = await NotesService.getLastNoteInFolder(affectedRows[0].folder_id);

      if (lastNote) {
        lastRow = lastNote;
      }
    }

    res.sendSuccess(200, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
      lastRow
    });
  })
};