import express from 'express';

import UsersController from '@/server/controllers/users.controller';

const router = express.Router();

router
  .get('/', UsersController.getAllUsers)
  .get('/:userSlug', UsersController.getOneUser)
  .put('/:userSlug', UsersController.updateUser)
  .delete('/:userSlug', UsersController.deleteUser);

export default router;