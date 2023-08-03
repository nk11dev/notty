import express from 'express';

import authController from '@/server/controllers/auth.controller';
import {
  validateUserRegister,
  validateUserLogin,
  verifyAccessToken,
  verifyRefreshToken,
  fixUserRoleAsUser,
} from '@/server/middlewares';

const router = express.Router();

router
  .post('/register',
    validateUserRegister,
    fixUserRoleAsUser,
    authController.register
  )

  .post('/login',
    validateUserLogin,
    authController.login
  )

  .get('/profile',
    verifyAccessToken,
    authController.profile
  )

  .get('/refresh',
    verifyRefreshToken,
    authController.refresh
  )

  .get('/logout', authController.logout);

export default router;