import type { Request, Response, NextFunction } from 'express';

import { safeSync, safeAsync } from '@/server/helpers/errors.helpers';
import FoldersService from '@/server/services/folders.service';
import type { TokenData } from '@/server/types/token.types';
import type { AccessConditions } from '@/server/types/auth.types';

export default {

  getAllFolders: safeAsync(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const result = await FoldersService.getAllFolders(userId);

    res.sendSuccess(200, result);
  }),

  createFolder: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.tokenData as TokenData;

    const result = await FoldersService.createFolder({
      ...req.body,
      user_id: id
    });

    res.sendSuccess(201, result);
  }),

  checkFolderExisted: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.folderSlug);
    const folder = await FoldersService.getOneFolder(id);

    if (!folder) {
      res.sendError(404, {
        message: 'Folder not found'
      });

    } else {
      res.locals.folder = folder;
      next();
    }
  }),

  checkFolderAccess: safeSync((req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.accessConditions as AccessConditions;
    const { folder } = res.locals;

    if (userId && (userId !== folder.user_id)) {
      res.sendAccessForbidden();

    } else {
      next();
    }
  }),

  getOneFolder: safeSync((_req: Request, res: Response) => {
    res.sendSuccess(200, res.locals.folder)
  }),

  updateFolder: safeAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.updateFolder(id, req.body);

    res.sendSuccess(200, {
      affectedRow: affectedRows[0] || null,
      affectedCount
    });
  }),

  deleteFolder: safeAsync(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.deleteFolder(id);
    const lastRow = await FoldersService.getLastFolder(userId);

    res.sendSuccess(200, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
      lastRow: lastRow || null
    });
  })
};