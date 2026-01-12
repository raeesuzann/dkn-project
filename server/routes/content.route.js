import { Router } from 'express';
import {
  addContent,
  deleteContent,
  getAllAwaitingContents,
  getAllContentList,
  getContentDetailsById,
  updateContent,
} from '../controller/content.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/list', getAllContentList);
router.get('/await-list', getAllAwaitingContents);
router.post('/add', authenticate, addContent);
router
  .route('/:id')
  .get(getContentDetailsById)
  .put(updateContent)
  .delete(deleteContent);


export const contentRoutes = router;
