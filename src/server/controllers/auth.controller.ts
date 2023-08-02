import type { Request, Response, NextFunction, CookieOptions } from 'express';

import { safeAsync } from '@/server/helpers/errors.helpers';
import AuthService from '@/server/services/auth.service';
import UsersService from '@/server/services/users.service';
import type { TokenData } from '@/server/types/token.types';

export default {

  register: async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await AuthService.hash(password);

    try {
      const createdUser = await UsersService.createUser({
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
      });

      res.sendSuccess(201, {
        message: 'User registered',
        user: createdUser
      });

    } catch (err) {

      if (err.code === '23505') {
        res.sendError(409, {
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

    const user = await UsersService.findUserByEmail(email.toLowerCase());

    if (!user) {
      res.sendError(404, {
        message: 'Login error',
        data: [{
          'path': 'email',
          'message': `Couldn't find your account`
        }]
      });

    } else {
      const isPasswordValid: boolean = await AuthService.verify(password, user.password);

      if (!isPasswordValid) {
        res.sendError(404, {
          message: 'Login error',
          data: [{
            'path': 'password',
            'message': 'Invalid password'
          }]
        });

      } else {
        const loggedUser = await UsersService.updateUserLastLoginAt(user.id);

        const {
          accessToken,
          atExpiresIn,
        } = AuthService.signJwt(user);

        const cookieOptions: CookieOptions = {
          expires: new Date(
            Date.now() + atExpiresIn * 1000
          ),
          maxAge: atExpiresIn * 1000,
          sameSite: 'strict',
          secure: true,
        };

        res.cookie('access-token', accessToken, {
          ...cookieOptions,
          httpOnly: true,
        });

        res.cookie('has-access-token', true, cookieOptions);

        res.sendSuccess(200, {
          message: 'User logged in',
          user: loggedUser
        });
      }
    }
  }),

  profile: safeAsync(async (req: Request, res: Response) => {
    const { id } = req.tokenData as TokenData;
    const result = await UsersService.getUserProfile(id);

    if (!result) {
      res.sendError(404, {
        message: 'User not found'
      });

    } else {
      res.sendSuccess(200, result);
    }
  }),

  logout: (_req: Request, res: Response) => {
    res.clearCookie('access-token');
    res.clearCookie('has-access-token');
    res.sendSuccess(204);
  }
};