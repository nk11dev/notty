import type { Request, Response } from 'express';

import FoldersService from '@/server/services/folders.service';
import type { TokenData } from '@/server/types/token.types';
import type { AccessConditions } from '@/server/types/auth.types';

export default class FoldersController {

  static async getAllFolders(req: Request, res: Response) {
    const { userId } = req.accessConditions as AccessConditions;

    const result = await FoldersService.getAllFolders(userId);

    res.sendSuccess(200, result);
  }

  static async getOneFolder(req: Request, res: Response) {
    const id = Number(req.params.folderSlug);
    const result = await FoldersService.getOneFolder(id);

    if (!result) {
      res.sendError(404, {
        message: 'Folder not found'
      });

    } else {
      res.sendSuccess(200, result);
    }
  }

  static async createFolder(req: Request, res: Response) {
    const { id } = req.tokenData as TokenData;

    const result = await FoldersService.createFolder({
      ...req.body,
      user_id: id
    });

    res.sendSuccess(201, result);
  }

  static async updateFolder(req: Request, res: Response) {
    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.updateFolder(
      id, req.body
    );

    res.sendSuccess(200, {
      affectedRows,
      affectedCount
    });
  }

  static async deleteFolder(req: Request, res: Response) {
    const id = Number(req.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.deleteFolder(id);
    const lastRow = await FoldersService.getLastFolder();

    res.sendSuccess(200, {
      affectedRows,
      affectedCount,
      lastRow
    });
  }
}