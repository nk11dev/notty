import type { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

import { UserRole } from '@/common/constants/auth.constants';

import AuthService from '@/server/services/auth.service';
import type { TokenData } from '@/server/types/token.types';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password) {
    req.body.password = await AuthService.hash(password);
  }

  next();
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.sendError(401, {
      message: 'Authentication error: access token is not provided or cookie expired'
    });

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {

      if (err) {
        const details = (err instanceof jwt.TokenExpiredError)
          ? 'access token expired'
          : 'access token is not verified';

        return res.sendError(401, {
          message: `Authentication error: ${details}`
        });

      } else {
        req.tokenData = decoded;

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
    return res.sendError(401, {
      message: 'Authentication error: refresh token is not provided or cookie expired'
    });

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err: any, decoded: any) => {

      if (err) {
        const details = (err instanceof jwt.TokenExpiredError)
          ? 'refresh token expired'
          : 'refresh token is not verified';

        return res.sendError(401, {
          message: `Authentication error: ${details}`
        });

      } else {
        res.locals.refreshTokenData = decoded;

        next();
      }
    });
  }
}

export const authorizeByRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.tokenData as TokenData;

    if (roles.includes(role)) {
      next();

    } else {
      res.sendAccessForbidden();
    }
  };
};