import express from 'express';

import { UserRole } from '@/common/constants/auth.constants';

import auth from '@/server/routes/auth.routes';
import users from '@/server/routes/users.routes';
import folders from '@/server/routes/folders.routes';
import notes from '@/server/routes/notes.routes';
import { verifyAccessToken, authorizeByRole } from '@/server/middlewares';

const router = express.Router();

router

  .use('/auth', auth)

  .use('/folders', verifyAccessToken, folders)
  .use('/notes', verifyAccessToken, notes)

  .use('/users',
    verifyAccessToken,
    authorizeByRole([UserRole.ADMIN]),
    users
  );

export default router;