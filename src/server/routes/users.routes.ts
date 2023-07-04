import express from 'express';

import UsersController from '@/server/controllers/users.controller';
import {
  validate,
  userUpdateRequestSchema,
} from '@/server/helpers/validation';
import { hashPassword } from '@/server/middlewares/auth.middlewares';

const router = express.Router();

router
  .get('/', UsersController.getAllUsers)
  .get('/:userSlug', UsersController.getOneUser)

  .put('/:userSlug',
    validate(userUpdateRequestSchema),
    hashPassword,
    UsersController.updateUser
  )

  .delete('/:userSlug', UsersController.deleteUser);

export default router;