import express from 'express';

import AuthController from '@/server/controllers/auth.controller';
import {
  validate,
  userCreateRequestSchema,
} from '@/server/helpers/validation';

const router = express.Router();

router
  .post('/register', validate(userCreateRequestSchema), AuthController.register);

export default router;