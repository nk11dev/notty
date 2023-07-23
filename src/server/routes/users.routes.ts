import express from 'express';

import UsersController from '@/server/controllers/users.controller';
import AuthController from '@/server/controllers/auth.controller';
import {
  validateUserCreate,
  validateUserUpdate,
  hashPassword,
} from '@/server/middlewares';

const router = express.Router();

router
  .get('/', UsersController.getAllUsers)

  .post('/',
    validateUserCreate,
    AuthController.register
  )

  .get('/:userSlug', UsersController.getOneUser)

  .put('/:userSlug',
    validateUserUpdate,
    hashPassword,
    UsersController.updateUser
  )

  .delete('/:userSlug', UsersController.deleteUser);

export default router;