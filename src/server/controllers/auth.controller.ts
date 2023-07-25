import type { Request, Response, NextFunction, CookieOptions } from 'express';
const jwt = require('jsonwebtoken');

import { catchErrors } from '@/server/helpers/errors.helpers';
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

  login: catchErrors(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UsersService.findUserByEmail(email);

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

        const tokenPayload = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        };

        const expiresIn = 172800;

        const token = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: expiresIn });

        const cookieOptions: CookieOptions = {
          expires: new Date(
            Date.now() + expiresIn * 1000
          ),
          maxAge: expiresIn * 1000,
        };

        res.cookie('access-token', token, {
          ...cookieOptions,
          httpOnly: true
        });

        res.cookie('has-access-token', true, cookieOptions);

        res.sendSuccess(200, {
          message: 'User logged in',
          user: loggedUser
        });
      }
    }
  }),

  profile: catchErrors(async (req: Request, res: Response) => {
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