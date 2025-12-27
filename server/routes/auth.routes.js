import { Router } from 'express';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.put('/set-password', setPassword);
router.put('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

router.get('/verify-token', authenticate, verifyToken);

export default router;