import express from 'express';

import { UserRole } from '@/common/constants/auth.constants';

import auth from '@/server/routes/auth.routes';
import users from '@/server/routes/users.routes';
import folders from '@/server/routes/folders.routes';
import notes from '@/server/routes/notes.routes';
import { verifyToken, authorizeByRole } from '@/server/middlewares';

const router = express.Router();

router

  // routes with custom token verification
  .use('/auth', auth)

  // routes with full token verification
  .use('/folders', verifyToken, folders)
  .use('/notes', verifyToken, notes)

  // routes with full token verification and authorization by role
  .use('/users',
    verifyToken,
    authorizeByRole([UserRole.ADMIN]),
    users
  );

export default router;