import type { Request, Response, NextFunction } from 'express';

export const ignoreFavicon = async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()

  } else {
    next();
  }
}