import express from 'express';

import AuthController from '@/server/controllers/auth.controller';
import {
  validateUserRegister,
  validateUserLogin,
  verifyToken,
  fixUserRoleAsUser,
} from '@/server/middlewares';

const router = express.Router();

router
  .post('/register',
    validateUserRegister,
    fixUserRoleAsUser,
    AuthController.register
  )
  .post('/login',
    validateUserLogin,
    AuthController.login
  )
  .get('/profile',
    verifyToken,
    AuthController.profile
  )
  .get('/logout', AuthController.logout);

export default router;