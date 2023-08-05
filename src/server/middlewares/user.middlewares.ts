import type { Request, Response, NextFunction } from 'express';

import { UserRole } from '@/common/constants';

export const fixUserRoleAsUser = async (req: Request, _res: Response, next: NextFunction) => {
  req.body.role = UserRole.USER;

  next();
}