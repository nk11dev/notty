import type { Request, Response } from 'express';

import { catchErrors } from '@/server/helpers/errors.helpers';
import FoldersService from '@/server/services/folders.service';
import type { TokenData } from '@/server/types/token.types';
import type { AccessConditions } from '@/server/types/auth.types';

export default {

  getAllFolders: catchErrors(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const result = await FoldersService.getAllFolders(userId);

    res.sendSuccess(200, result);
  }),

  getOneFolder: catchErrors(async (req: Request, res: Response) => {
    const { userId } = req.accessConditions as AccessConditions;

    const id = Number(req.params.folderSlug);
    const result = await FoldersService.getOneFolder(id);

    if (!result) {
      res.sendError(404, {
        message: 'Folder not found'
      });

    } else {
      if (userId && (userId !== result.user_id)) {
        res.sendAccessForbidden();

      } else {
        res.sendSuccess(200, result);
      }
    }
  }),

  createFolder: catchErrors(async (req: Request, res: Response) => {
    const { id } = req.tokenData as TokenData;

    const result = await FoldersService.createFolder({
      ...req.body,
      user_id: id
    });

    res.sendSuccess(201, result);
  }),

  updateFolder: catchErrors(async (req: Request, res: Response) => {
    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.updateFolder(
      id, req.body
    );

    res.sendSuccess(200, {
      affectedRows,
      affectedCount
    });
  }),

  deleteFolder: catchErrors(async (req: Request, res: Response) => {
    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.deleteFolder(id);
    const lastRow = await FoldersService.getLastFolder();

    res.sendSuccess(200, {
      affectedRows,
      affectedCount,
      lastRow
    });
  })
};