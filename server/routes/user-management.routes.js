import { Router } from 'express';
import {
  getAllUserList,
  getUserById,
} from '../controller/user-management.controller.js';

const router = Router();

router.get('/list', getAllUserList);
router.route('/:id').get(getUserById);
//   .put(updateUserByID)
//   .delete(deleteUserByID);

export const userRoutes = router;
