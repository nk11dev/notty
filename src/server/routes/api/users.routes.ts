import express from 'express';

import usersController from '@/server/controllers/users.controller';
import authController from '@/server/controllers/auth.controller';
import {
  validateUserCreate,
  validateUserUpdate,
  hashPassword,
} from '@/server/middlewares';

const router = express.Router();

router
  .get('/', usersController.getAllUsers)

  .post('/',
    validateUserCreate,
    authController.register
  )

  .get('/:userSlug',
    usersController.findUser,
    usersController.getUser
  )

  .put('/:userSlug',
    validateUserUpdate,
    hashPassword,
    usersController.findUser,
    usersController.updateUser
  )

  .delete('/:userSlug',
    usersController.findUser,
    usersController.deleteUser
  );

export default router;