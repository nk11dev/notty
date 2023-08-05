import type { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '@/common/constants';

export const ignoreFavicon = async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(HttpStatus.NO_CONTENT).end()

  } else {
    next();
  }
}