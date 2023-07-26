import express from 'express';

import auth from '@/server/routes/auth.routes';
import users from '@/server/routes/users.routes';
import folders from '@/server/routes/folders.routes';
import notes from '@/server/routes/notes.routes';
import { verifyToken } from '@/server/middlewares';

const router = express.Router();

router.use('/auth', auth);
router.use('/folders', verifyToken, folders);
router.use('/notes', verifyToken, notes);
router.use('/users', users);

export default router;