import type { Request, Response } from 'express';

import UsersService from '@/server/services/users.service';

export default class UsersController {

  static async getAllUsers(_request: Request, response: Response) {
    const result = await UsersService.getAllUsers();

    response.status(200).json({
      payload: result
    });
  }

  static async getOneUser(request: Request, response: Response) {
    const id = Number(request.params.userSlug);
    const result = await UsersService.findUserById(id);

    if (!result) {
      response.status(404).send('User is not found');

    } else {
      response.status(200).json({
        payload: result
      });
    }
  }

  static async updateUser(request: Request, response: Response) {
    const id = Number(request.params.userSlug);

    const result = await UsersService.updateUser(id, request.body);
    const { raw, affected } = result || {};

    response.status(200).json({
      payload: {
        affectedRows: raw[0] || null,
        affectedCount: affected
      }
    });
  }

  static async deleteUser(request: Request, response: Response) {
    const id = Number(request.params.userSlug);

    const [affectedRows, affectedCount] = await UsersService.deleteUser(id);

    response.status(200).json({
      payload: {
        affectedRows,
        affectedCount,
      }
    });
  }

}