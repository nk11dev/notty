import type { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '@/common/constants';

import { safeSync, safeAsync } from '@/server/helpers/errors.helpers';
import foldersService from '@/server/services/folders.service';
import type { AccessTokenPayload } from '@/server/types/token.types';
import type { AccessConditions } from '@/server/types/auth.types';

export default {

  // success handlers, used without 404 and 403 errors handlers
  getAllFolders: safeAsync(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const result = await foldersService.getAllFolders(userId);

    res.sendSuccess(HttpStatus.OK, result);
  }),

  createFolder: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.accessTokenPayload as AccessTokenPayload;

    const result = await foldersService.createFolder({
      ...req.body,
      user_id: id
    });

    res.sendSuccess(HttpStatus.CREATED, result);
  }),

  // errors handlers, used before success handlers
  findFolder: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.folderSlug;
    const folder = await foldersService.getFolder(id);

    if (!folder) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'Folder not found'
      });

    } else {
      res.locals.folder = folder;
      next();
    }
  }),

  // success handlers, used after errors handlers
  checkFolderAccess: safeSync((req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.accessConditions as AccessConditions;
    const { folder } = res.locals;

    if (userId && (userId !== folder.user_id)) {
      res.sendAccessForbidden();

    } else {
      next();
    }
  }),

  getFolder: safeSync((_req: Request, res: Response) => {
    res.sendSuccess(HttpStatus.OK, res.locals.folder)
  }),

  updateFolder: safeAsync(async (req: Request, res: Response) => {
    const id = req.params.folderSlug;

    const [affectedRows, affectedCount] = await foldersService.updateFolder(id, req.body);

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: affectedRows[0] || null,
      affectedCount
    });
  }),

  deleteFolder: safeAsync(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const id = req.params.folderSlug;

    const [affectedRows, affectedCount] = await foldersService.deleteFolder(id);
    const lastRow = await foldersService.getLastFolder(userId);

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
      lastRow: lastRow || null
    });
  })
};