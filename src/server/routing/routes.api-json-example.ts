import express from 'express';

import {
  getSections,
  getSection,
} from '@/server/api/json-example/sections.api-json-example';

const router = express.Router();

router.get('/sections', getSections);
router.get('/sections/:sectionId', getSection);

export default router;