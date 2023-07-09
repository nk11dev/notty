import type { Request, Response } from 'express';

import UsersService from '@/server/services/users.service';
import type { TokenData } from '@/server/types/token.types';

export default class UsersController {

  static async getAllUsers(_req: Request, res: Response) {
    const result = await UsersService.getAllUsers();

    res.sendSuccess(200, result);
  }

  static async getOneUser(req: Request, res: Response) {
    const id = Number(req.params.userSlug);
    const result = await UsersService.findUserById(id);

    if (!result) {
      res.sendError(404, {
        message: 'User not found'
      });

    } else {
      res.sendSuccess(200, result);
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    const { id } = req.tokenData as TokenData;
    const result = await UsersService.getUserProfile(id);

    res.sendSuccess(200, result);
  }

  static async updateUser(req: Request, res: Response) {
    const id = Number(req.params.userSlug);

    const result = await UsersService.updateUserData(id, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(200, {
      affectedRows: raw[0] || null,
      affectedCount: affected
    });
  }

  static async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.userSlug);

    const [affectedRows, affectedCount] = await UsersService.deleteUser(id);

    res.sendSuccess(200, {
      affectedRows,
      affectedCount,
    });
  }

}