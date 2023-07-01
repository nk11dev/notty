import type { Request, Response } from 'express';

import FoldersService from '@/server/services/folders.service';

export default class FoldersController {
  
  static async getAllFolders(_request: Request, response: Response) {
    const result = await FoldersService.getAllFolders();

    response.status(200).json({
      payload: result
    });
  }

  static async getOneFolder(request: Request, response: Response) {
    const id = Number(request.params.folderSlug);
    const result = await FoldersService.getOneFolder(id);

    if (!result) {
      response.status(404).send('Folder is not found');

    } else {
      response.status(200).json({
        payload: result
      });
    }
  }

  static async createFolder(request: Request, response: Response) {
    const result = await FoldersService.createFolder(request.body);

    response.status(201).json({
      payload: result
    });
  }

  static async updateFolder(request: Request, response: Response) {
    const id = Number(request.params.folderSlug);
    
    const [affectedRows, affectedCount] = await FoldersService.updateFolder(
      id, request.body
    );

    response.status(200).json({
      payload: {
        affectedRows,
        affectedCount
      }
    });
  }

  static async deleteFolder(request: Request, response: Response) {
    const id = Number(request.params.folderSlug);

    const [affectedRows, affectedCount] = await FoldersService.deleteFolder(id);
    const lastRow = await FoldersService.getLastFolder();

    response.status(200).json({
      payload: {
        affectedRows,
        affectedCount,
        lastRow
      }
    });
  }
}