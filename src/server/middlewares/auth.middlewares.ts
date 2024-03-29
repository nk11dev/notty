import type { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

import { HttpStatus, UserRole } from '@/common/constants';

import authService from '@/server/services/auth.service';
import type { AccessTokenPayload } from '@/server/types/token.types';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password) {
    req.body.password = await authService.hash(password);
  }

  next();
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.sendError(HttpStatus.UNAUTHORIZED, {
      message: 'Authentication error: access token is not provided or cookie expired'
    });

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {

      if (err) {
        const details = (err instanceof jwt.TokenExpiredError)
          ? 'access token expired'
          : 'access token is not verified';

        return res.sendError(HttpStatus.UNAUTHORIZED, {
          message: `Authentication error: ${details}`
        });

      } else {
        req.accessTokenPayload = decoded;

        req.accessConditions = {
          userId: (decoded.role === UserRole.ADMIN)
            ? null
            : decoded.id
        };

        next();
      }
    });
  }
}

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies['refresh-token'];

  if (!refreshToken) {
    return res.sendError(HttpStatus.UNAUTHORIZED, {
      message: 'Authentication error: refresh token is not provided or cookie expired'
    });

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err: any, decoded: any) => {

      if (err) {
        const details = (err instanceof jwt.TokenExpiredError)
          ? 'refresh token expired'
          : 'refresh token is not verified';

        return res.sendError(HttpStatus.UNAUTHORIZED, {
          message: `Authentication error: ${details}`
        });

      } else {
        req.refreshTokenPayload = decoded;

        next();
      }
    });
  }
}

export const authorizeByRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.accessTokenPayload as AccessTokenPayload;

    if (roles.includes(role)) {
      next();

    } else {
      res.sendAccessForbidden();
    }
  };
};