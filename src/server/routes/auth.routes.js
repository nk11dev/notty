import express from 'express';

import AuthController from '@/server/controllers/auth.controller';
import { validateUserCreate } from '@/server/middlewares';

const router = express.Router();

router
  .post('/register',
    validateUserCreate,
    AuthController.register
  );

export default router;