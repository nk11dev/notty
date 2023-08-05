import type { Request, Response, NextFunction, CookieOptions } from 'express';

import { HttpStatus } from '@/common/constants';

import { safeAsync } from '@/server/helpers/errors.helpers';
import authService from '@/server/services/auth.service';
import usersService from '@/server/services/users.service';
import type { TokenData } from '@/server/types/token.types';

const cookieOptions: CookieOptions = {
  sameSite: 'strict',
  secure: true,
};

export default {

  register: async (req: Request, res: Response, next: NextFunction) => {
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
  },

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
          ...cookieOptions,
          expires: new Date(
            Date.now() + atExpiresIn * 1000
          ),
          maxAge: atExpiresIn * 1000,
          httpOnly: true,
        });

        res.cookie('refresh-token', refreshToken, {
          ...cookieOptions,
          expires: new Date(
            Date.now() + rtExpiresIn * 1000
          ),
          maxAge: rtExpiresIn * 1000,
          httpOnly: true,
        });

        res.cookie('has-access-token', true, cookieOptions);

        res.sendSuccess(HttpStatus.OK, {
          message: 'User logged in',
          user: loggedUser
        });
      }
    }
  }),

  profile: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.tokenData as TokenData;
    const result = await usersService.getUserProfile(id);

    if (!result) {
      res.sendError(HttpStatus.NOT_FOUND, {
        message: 'User not found'
      });

    } else {
      res.sendSuccess(HttpStatus.OK, result);
    }
  }),

  refresh: safeAsync(async (_req: Request, res: Response) => {
    const { refreshTokenData } = res.locals;
    const { id: userId } = refreshTokenData;

    const user = await usersService.findUserById(userId);

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
        ...cookieOptions,
        expires: new Date(
          Date.now() + atExpiresIn * 1000
        ),
        maxAge: atExpiresIn * 1000,
        httpOnly: true,
      });

      res.cookie('has-access-token', true, cookieOptions);

      res.sendSuccess(HttpStatus.NO_CONTENT);
    }
  }),

  logout: (_req: Request, res: Response) => {
    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.clearCookie('has-access-token');
    res.sendSuccess(HttpStatus.NO_CONTENT);
  }
};