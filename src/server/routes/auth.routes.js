import express from 'express';

import AuthController from '@/server/controllers/auth.controller';

const router = express.Router();

router
  .post('/register', AuthController.register);

export default router;