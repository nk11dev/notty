import type { Request, Response } from 'express';

import { catchErrors } from '@/server/helpers/errors.helpers';
import UsersService from '@/server/services/users.service';

export default {

  getAllUsers: catchErrors(async (_req: Request, res: Response) => {
    const result = await UsersService.getAllUsers();

    res.sendSuccess(200, result);
  }),

  getOneUser: catchErrors(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);
    const result = await UsersService.findUserById(id);

    if (!result) {
      res.sendError(404, {
        message: 'User not found'
      });

    } else {
      res.sendSuccess(200, result);
    }
  }),

  updateUser: catchErrors(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const result = await UsersService.updateUserData(id, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(200, {
      affectedRow: raw[0] || null,
      affectedCount: affected
    });
  }),

  deleteUser: catchErrors(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const [affectedRows, affectedCount] = await UsersService.deleteUser(id);

    res.sendSuccess(200, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
    });
  })
};