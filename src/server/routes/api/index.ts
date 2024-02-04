import express from 'express';

import { UserRole } from '@/common/constants';

import auth from '@/server/routes/api/auth.routes';
import users from '@/server/routes/api/users.routes';
import folders from '@/server/routes/api/folders.routes';
import notes from '@/server/routes/api/notes.routes';
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