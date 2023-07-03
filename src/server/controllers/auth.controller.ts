import type { Request, Response } from 'express';
import colors from 'ansi-colors';

import UsersService from '@/server/services/users.service';

export default class AuthController {

  static async register(request: Request, response: Response) {
    console.log(colors.blue('\n--- AuthController.registration()'));
    console.log('request.body:', request.body);

    const { email, password } = request.body;
    const errorName = 'Registration error.';

    if (email && password) {
      try {
        const result = await UsersService.createUser(request.body);

        response.status(200).json({
          payload: result
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log('err.detail:', err.detail)

        if (err.code === '23505') {
          return response.status(409).json({
            error: errorName,
            message: 'User with that email already exist',
          });
        }
      }

    } else {
      response.status(400).json({
        error: errorName,
        message: `Empty email or password`
      });
    }
  }

}