import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { ZodIssue } from 'zod';
import colors from 'ansi-colors';

import {
  userCreateRequestSchema,
  userUpdateRequestSchema,
  userLoginRequestSchema,
} from '@/server/schemas';

const validate = (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();

    } catch (error) {
      console.log(colors.red('\n--- validation.middleware'));
      console.log('error.issues:', error.issues);

      let err = error;

      if (err instanceof z.ZodError) {
        err = error.issues.map((e: ZodIssue) => (
          { path: e.path[1], message: e.message })
        );
      }

      res.sendError(422, {
        message: 'Validation error',
        data: err
      });
    }
  };

export const validateUserCreate = validate(userCreateRequestSchema);

export const validateUserUpdate = validate(userUpdateRequestSchema);

export const validateUserLogin = validate(userLoginRequestSchema);