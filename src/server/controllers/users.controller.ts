import type { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '@/common/constants';

import { safeSync, safeAsync } from '@/server/helpers/errors.helpers';
import usersService from '@/server/services/users.service';

export default {

  // success handler, used without 404 handler
  getAllUsers: safeAsync(async (_req: Request, res: Response) => {
    const result = await usersService.getAllUsers();

    res.sendSuccess(HttpStatus.OK, result);
  }),

  // 404 handler, used before other success handlers
  findUser: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.userSlug);
    const user = await usersService.findUserById(id);

    if (!user) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'User not found'
      });

    } else {
      res.locals.user = user;
      next();
    }
  }),

  // success handlers, used after 404 handler
  getUser: safeSync(async (_req: Request, res: Response) => {
    res.sendSuccess(HttpStatus.OK, res.locals.user)
  }),

  updateUser: safeAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const result = await usersService.updateUserData(id, req.body);
    const { raw, affected } = result || {};

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: raw[0] || null,
      affectedCount: affected
    });
  }),

  deleteUser: safeAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.userSlug);

    const [affectedRows, affectedCount] = await usersService.deleteUser(id);

    res.sendSuccess(HttpStatus.OK, {
      affectedRow: affectedRows[0] || null,
      affectedCount,
    });
  })
};