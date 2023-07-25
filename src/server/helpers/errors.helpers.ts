import type { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (req: Request, res: Response, next: NextFunction) => any;

export const catchErrors = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => handler(req, res, next).catch(next);
};