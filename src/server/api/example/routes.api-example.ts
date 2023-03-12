import express from 'express';

import {
  getSections,
  getSection,
} from './sections.api-example';

const router = express.Router();

router.get('/sections', getSections);
router.get('/sections/:sectionId', getSection);

export default router;