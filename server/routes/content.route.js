import { Router } from 'express';
import {
  addContent,
  deleteContent,
  getAllContentList,
  getContentDetailsById,
  updateContent,
} from '../controller/content.controller.js';

const router = Router();

router.get('/list', getAllContentList);
router.get('/add', addContent);
router
  .route('/:id')
  .get(getContentDetailsById)
  .put(updateContent)
  .delete(deleteContent);

export const contentRoutes = router;
