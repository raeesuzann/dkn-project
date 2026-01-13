import { Router } from 'express';
import {
  addUser,
  getAllUserList,
  getUserById,
} from '../controller/user-management.controller.js';

const router = Router();

router.get('/list', getAllUserList);
router.post("/add", addUser)
router.route('/:id').get(getUserById);
//   .put(updateUserByID)
//   .delete(deleteUserByID);

export const userRoutes = router;
