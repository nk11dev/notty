import express from 'express';

import AuthController from '@/server/controllers/auth.controller';
import {
  validateUserCreate,
  validateUserLogin,
} from '@/server/middlewares';

const router = express.Router();

router
  .post('/register',
    validateUserCreate,
    AuthController.register
  )
  .post('/login',
    validateUserLogin,
    AuthController.login
  )
  .get('/logout', AuthController.logout);

export default router;