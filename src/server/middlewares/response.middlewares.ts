import type { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '@/common/constants';

export function addResponseFormats(_req: Request, res: Response, next: NextFunction) {

  res.sendSuccess = function (statusCode: number, payload?: unknown) {
    return payload
      ? res.status(statusCode).json({
        status: 'success',
        payload,
      })
      : res.status(statusCode).end();
  };

  res.sendError = function (statusCode: number, error: unknown) {
    return res.status(statusCode).send({
      status: 'error',
      error
    });
  };

  res.sendAccessForbidden = function () {
    return res.sendError(HttpStatus.FORBIDDEN, {
      message: 'Access forbidden'
    });
  };

  next();
}