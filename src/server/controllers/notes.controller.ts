import type { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '@/common/constants';

import { safeSync, safeAsync } from '@/server/helpers/errors.helpers';
import notesService from '@/server/services/notes.service';
import foldersService from '@/server/services/folders.service';
import type { AccessConditions } from '@/server/types/auth.types';

export default {

  // errors handlers (for notes, where specified folder id is required), used before success handlers
  findParentFolder: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const folderId = req.params.folderSlug;
    const parentFolder = await foldersService.findFolder(folderId);

    if (!parentFolder) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: `Parent folder with 'id' = '${folderId}' not found.`
      });

    } else {
      res.locals.parentFolder = parentFolder;
      next();
    }
  }),

  checkParentFolderAccess: safeSync((req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.accessConditions as AccessConditions;
    const { parentFolder } = res.locals;

    if (userId && (userId !== parentFolder.user_id)) {
      res.sendAccessForbidden();

    } else {
      next();
    }
  }),

  // success handlers (for notes, where specified folder id is required), used after errors handlers
  getAllNotes: safeAsync(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const folderId = req.params.folderSlug;
    const result = await notesService.getAllNotes(folderId, userId, req.query);

    res.sendSuccess(HttpStatus.OK, result);
  }),

  createNote: safeAsync(async (req: Request, res: Response) => {
    const { parentFolder } = res.locals;

    const result = await notesService.createNote({
      ...req.body,
      user_id: parentFolder.user_id,
      folder_id: parentFolder.id,
    });

    res.sendSuccess(HttpStatus.CREATED, result);
  }),

  // errors handlers (for notes without specified folder id), used before success handlers
  findNote: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.noteSlug;
    const note = await notesService.getNote(noteId);

    if (!note) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'Note not found'
      });

    } else {
      res.locals.note = note;
      next();
    }
  }),

  checkNoteAccess: safeSync((req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.accessConditions as AccessConditions;
    const { note } = res.locals;

    if (userId && (userId !== note.user_id)) {
      res.sendAccessForbidden();

    } else {
      next();
    }
  }),

  // success handlers (for notes without specified folder id), used after errors handlers 
  getNote: safeSync((_req: Request, res: Response) => {
    res.sendSuccess(HttpStatus.OK, res.locals.note)
  }),

  updateNote: safeAsync(async (req: Request, res: Response) => {
    const noteId = req.params.noteSlug;

    const result = await notesService.updateNote(noteId, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: raw[0] || null,
      affectedCount: affected
    });
  }),

  deleteNote: safeAsync(async (req: Request, res: Response) => {
    const noteId = req.params.noteSlug;

    const [affectedRows, affectedCount] = await notesService.deleteNote(noteId);

    let lastRow = null;

    if (affectedCount > 0) {
      const lastNote = await notesService.getLastNoteInFolder(affectedRows[0].folder_id);

      if (lastNote) {
        lastRow = lastNote;
      }
    }

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
      lastRow
    });
  })
};