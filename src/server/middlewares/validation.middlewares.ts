import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { ZodIssue } from 'zod';

import { HttpStatus } from '@/common/constants';
import {
  userRegisterRequestSchema,
  userCreateRequestSchema,
  userUpdateRequestSchema,
  userLoginRequestSchema,
} from '@/common/schemas';

const validate = (schema: z.AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();

    } catch (error) {
      let err = error;

      if (err instanceof z.ZodError) {
        err = error.issues.map((e: ZodIssue) => (
          { path: e.path[1], message: e.message })
        );
      }

      res.sendError(HttpStatus.UNPROCESSABLE_ENTITY, {
        message: 'Validation error',
        data: err
      });
    }
  };

export const validateUserRegister = validate(userRegisterRequestSchema);

export const validateUserCreate = validate(userCreateRequestSchema);

export const validateUserUpdate = validate(userUpdateRequestSchema);

export const validateUserLogin = validate(userLoginRequestSchema);