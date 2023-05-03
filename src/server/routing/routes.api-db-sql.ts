import express from 'express';

import {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection
} from '@/server/api/db-sql/sections.api-db-sql';

const router = express.Router();

router.get('/sections', getSections);
router.get('/sections/:sectionId', getSection);
router.post('/sections', createSection);
router.put('/sections/:sectionId', updateSection);
router.delete('/sections/:sectionId', deleteSection);

export default router;