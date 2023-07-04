import type { Request, Response, NextFunction } from 'express';

import AuthService from '@/server/services/auth.service';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  
  if (password) {
    req.body.password = await AuthService.hash(password);
  }

  next();
}