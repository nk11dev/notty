import type { Request, Response, NextFunction } from 'express';

import { safeSync, safeAsync } from '@/server/helpers/errors.helpers';
import UsersService from '@/server/services/users.service';

export default {

  // success handler, used without 404 handler
  getAllUsers: safeAsync(async (_req: Request, res: Response) => {
    const result = await UsersService.getAllUsers();

    res.sendSuccess(200, result);
  }),

  // 404 handler, used before other success handlers
  findUser: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.userSlug);
    const user = await UsersService.findUserById(id);

    if (!user) {
      res.sendError(404, {
        message: 'User not found'
      });

    } else {
      res.locals.user = user;
      next();
    }
  }),

  // success handlers, used after 404 handler
  getUser: safeSync(async (_req: Request, res: Response) => {
    res.sendSuccess(200, res.locals.user)
  }),

  updateUser: safeAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const result = await UsersService.updateUserData(id, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(200, {
      affectedRow: raw[0] || null,
      affectedCount: affected
    });
  }),

  deleteUser: safeAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const [affectedRows, affectedCount] = await UsersService.deleteUser(id);

    res.sendSuccess(200, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
    });
  })
};