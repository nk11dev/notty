import express from 'express';

import UsersController from '@/server/controllers/users.controller';
import {
  validateUserUpdate,
  hashPassword,
} from '@/server/middlewares';

const router = express.Router();

router
  .get('/', UsersController.getAllUsers)
  .get('/:userSlug', UsersController.getOneUser)

  .put('/:userSlug',
    validateUserUpdate,
    hashPassword,
    UsersController.updateUser
  )

  .delete('/:userSlug', UsersController.deleteUser);

export default router;