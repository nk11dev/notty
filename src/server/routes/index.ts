import express from 'express';

import auth from '@/server/routes/auth.routes';
import users from '@/server/routes/users.routes';
import folders from '@/server/routes/folders.routes';
import notes from '@/server/routes/notes.routes';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/folders', folders);
router.use('/notes', notes);

export default router;