import type { Request, Response, NextFunction, CookieOptions } from 'express';

import { HttpStatus } from '@/common/constants';

import { safeAsync } from '@/server/helpers/errors.helpers';
import authService from '@/server/services/auth.service';
import usersService from '@/server/services/users.service';
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '@/server/types/token.types';

const getCookieOptions = (expiresIn: number): CookieOptions => ({
  sameSite: 'strict',
  secure: true,
  expires: new Date(
    Date.now() + expiresIn * 1000
  ),
  maxAge: expiresIn * 1000,
});

export default {

  register: safeAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await authService.hash(password);

    try {
      const createdUser = await usersService.createUser({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
      });

      res.sendSuccess(HttpStatus.CREATED, {
        message: 'User registered',
        user: createdUser
      });

    } catch (err) {

      if (err.code === '23505') {
        res.sendError(HttpStatus.CONFLICT, {
          message: 'Registration error',
          data: [{
            'path': 'email',
            'message': 'Email already registered'
          }]
        });

      } else {
        next(err);
      }
    }
  }),

  login: safeAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await usersService.findUserByEmail(email.toLowerCase());

    if (!user) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'Authentication error',
        data: [{
          'path': 'email',
          'message': `Couldn't find your account`
        }]
      });

    } else {
      const isPasswordValid: boolean = await authService.verify(password, user.password);

      if (!isPasswordValid) {
        res.sendError(HttpStatus.UNAUTHORIZED, {
          message: 'Authentication error',
          data: [{
            'path': 'password',
            'message': 'Invalid password'
          }]
        });

      } else {
        const loggedUser = await usersService.updateUserLastLoginAt(user.id);

        const {
          accessToken,
          refreshToken,
          atExpiresIn,
          rtExpiresIn,
        } = authService.signJwt(user);

        res.cookie('access-token', accessToken, {
          ...getCookieOptions(atExpiresIn),
          httpOnly: true,
        });

        res.cookie('refresh-token', refreshToken, {
          ...getCookieOptions(rtExpiresIn),
          httpOnly: true,
        });

        res.cookie('has-refresh-token', true,
          getCookieOptions(rtExpiresIn)
        );

        res.sendSuccess(HttpStatus.OK, {
          message: 'User logged in',
          user: loggedUser
        });
      }
    }
  }),

  profile: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.accessTokenPayload as AccessTokenPayload;
    const result = await usersService.getUserProfile(id);

    if (!result) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'User not found'
      });

    } else {
      res.sendSuccess(HttpStatus.OK, result);
    }
  }),

  refresh: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.refreshTokenPayload as RefreshTokenPayload;

    const user = await usersService.findUserById(id);

    if (!user) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'Authentication error: user nod found'
      });

    } else {
      const {
        accessToken,
        atExpiresIn,
      } = authService.signJwt(user);

      res.cookie('access-token', accessToken, {
        ...getCookieOptions(atExpiresIn),
        httpOnly: true,
      });

      res.sendSuccess(HttpStatus.NO_CONTENT);
    }
  }),

  logout: (_req: Request, res: Response) => {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.clearCookie('has-refresh-token');
    res.sendSuccess(HttpStatus.NO_CONTENT);
  }
};