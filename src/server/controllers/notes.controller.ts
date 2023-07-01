import type { Request, Response } from 'express';

import NotesService from '@/server/services/notes.service';
import FoldersService from '@/server/services/folders.service';

export default class NotesController {

  static async getAllNotes(request: Request, response: Response) {
    const folderId = Number(request.params.folderSlug);
    const result = await NotesService.getAllNotes(folderId, request.query);

    response.status(200).json({
      payload: result
    });
  }

  static async getOneNote(request: Request, response: Response) {
    const noteId = Number(request.params.noteSlug);
    const result = await NotesService.getOneNote(noteId);

    if (!result) {
      response.status(404).send('Note is not found');

    } else {
      response.status(200).json({
        payload: result
      });
    }
  }

  static async createNote(request: Request, response: Response) {
    const folderId = Number(request.params.folderSlug);
    const relatedFolder = await FoldersService.findFolder(folderId);

    if (!relatedFolder) {
      response.status(400).json({
        error: 'Cannot create note.',
        message: `Foreign key constraint preasumable violation: Folder with 'id' = '${folderId}' doesn't exist in 'folders' table.`
      });

    } else {
      const result = await NotesService.createNote(folderId, request.body);

      response.status(201).json({
        payload: result
      });
    }
  }

  static async updateNote(request: Request, response: Response) {
    const noteId = Number(request.params.noteSlug);

    const result = await NotesService.updateNote(noteId, request.body);
    const { raw, affected } = result || {};

    response.status(200).json({
      payload: {
        affectedRows: raw[0] || null,
        affectedCount: affected
      }
    });
  }

  static async deleteNote(request: Request, response: Response) {
    const noteId = Number(request.params.noteSlug);

    const [affectedRows, affectedCount] = await NotesService.deleteNote(noteId);

    let lastRow = null;

    if (affectedCount > 0) {
      const lastNote = await NotesService.getLastNoteInFolder(affectedRows[0].folder_id);

      if (lastNote) {
        lastRow = lastNote;
      }
    }

    response.status(200).json({
      payload: {
        affectedCount,
        affectedRow: affectedRows[0] || null,
        lastRow
      }
    });
  }
}