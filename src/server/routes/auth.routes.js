import express from 'express';

import authController from '@/server/controllers/auth.controller';
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
    authController.register
  )
  .post('/login',
    validateUserLogin,
    authController.login
  )
  .get('/profile',
    verifyToken,
    authController.profile
  )
  .get('/logout', authController.logout);

export default router;