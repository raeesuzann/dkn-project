import { Router } from 'express';
import {
  changePassword,
  forgotPassword,
  login,
  setPassword,
  signUp,
  verifyToken,
} from '../controller/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/sign-in', login);
router.post('/sign-up', signUp);
router.put('/set-password', setPassword);
router.put('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

router.get('/verify-token', authenticate, verifyToken);

export default router;
