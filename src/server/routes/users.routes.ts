import express from 'express';

import UsersController from '@/server/controllers/users.controller';
import {
  validateUserUpdate,
  hashPassword,
  verifyToken,
} from '@/server/middlewares';

const router = express.Router();

router
  .get('/', UsersController.getAllUsers)

  .get('/profile',
    verifyToken,
    UsersController.getCurrentUser
  )

  .get('/:userSlug', UsersController.getOneUser)

  .put('/:userSlug',
    validateUserUpdate,
    hashPassword,
    UsersController.updateUser
  )

  .delete('/:userSlug', UsersController.deleteUser);

export default router;