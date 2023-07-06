import type { Request, Response } from 'express';
import colors from 'ansi-colors';

import AuthService from '@/server/services/auth.service';
import UsersService from '@/server/services/users.service';

export default class AuthController {

  static async register(request: Request, response: Response) {
    console.log(colors.blue('\n--- AuthController.register()'));
    console.log('request.body:', request.body);

    const { email, password } = request.body;
    const hashedPassword = await AuthService.hash(password);

    try {
      const result = await UsersService.createUser({
        email: email.toLowerCase(),
        password: hashedPassword
      });

      response.status(200).json({
        payload: result
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(colors.red(`registration error: ${err}`));

      if (err.code === '23505') {
        return response.status(409).json({
          errors: [
            { message: 'User with that email already exist' }
          ],
        });
      }
    }
  }

  static async login(request: Request, response: Response) {
    console.log(colors.blue('\n--- AuthController.login()'));
    console.log('request.body:', request.body);

    const { email, password } = request.body;

    try {
      const user = await UsersService.findUserByEmail(email);

      if (!user) {
        response.status(404).send('User is not found');

      } else {
        const isPasswordValid: boolean = await AuthService.verify(password, user.password);

        if (!isPasswordValid) {
          response.status(404).send('Invalid password');

        } else {
          await UsersService.updateUserLastLoginAt(user.id);

          response.status(200).json({
            payload: user
          });
        }
      }

    } catch (err) {
      console.log(colors.red(`login error: ${err}`));

      return response.status(404).json({
        errors: err
      });
    }
  }

}