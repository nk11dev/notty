import express from 'express';

import {
  getSections,
  getSection,
  createSection,
  deleteSection,
  updateSection
} from '@/server/api/db-orm/sections.api-db-orm';

const router = express.Router();

router.get('/sections', getSections);
router.get('/sections/:sectionId', getSection);
router.post('/sections', createSection);
router.put('/sections/:sectionId', updateSection);
router.delete('/sections/:sectionId', deleteSection);

export default router;