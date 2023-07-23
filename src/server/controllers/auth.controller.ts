import type { Request, Response, CookieOptions } from 'express';
import colors from 'ansi-colors';
const jwt = require('jsonwebtoken');

import AuthService from '@/server/services/auth.service';
import UsersService from '@/server/services/users.service';
import type { TokenData } from '@/server/types/token.types';

export default class AuthController {

  static async register(req: Request, res: Response) {
    console.log(colors.blue('\n--- AuthController.register()'));
    console.log('req.body:', req.body);

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
      console.log(colors.red(`registration error: ${err}`));

      if (err.code === '23505') {
        res.sendError(409, {
          message: 'Registration error',
          data: [{
            'path': 'email',
            'message': 'Email already registered'
          }]
        });
      }
    }
  }

  static async login(req: Request, res: Response) {
    console.log(colors.blue('\n--- AuthController.login()'));
    console.log('req.body:', req.body);

    const { email, password } = req.body;

    try {
      const user = await UsersService.findUserByEmail(email);

      if (!user) {
        res.sendError(404, {
          message: 'Login error',
          data: [{
            'path': 'email',
            'message': 'Email not registered'
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

    } catch (error) {
      console.log(colors.red(`login error: ${error}`));

      res.sendError(404, {
        message: 'Login error',
        data: error
      });
    }
  }

  static async profile(req: Request, res: Response) {
    const { id } = req.tokenData as TokenData;
    const result = await UsersService.getUserProfile(id);

    res.sendSuccess(200, result);
  }

  static logout(_req: Request, res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('has-access-token');
    res.sendSuccess(204);
  }

}