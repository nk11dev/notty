import type { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

import AuthService from '@/server/services/auth.service';

export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (password) {
    req.body.password = await AuthService.hash(password);
  }

  next();
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(401).send({
      message: 'Token is not provided or cookie expired'
    });

  } else {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {

      if (err) {
        return res.status(401).send({
          message: (err instanceof jwt.TokenExpiredError)
            ? 'JWT expired'
            : 'Unauthorized'
        });

      } else {
        req.tokenData = decoded;

        next();
      }
    });
  }
}