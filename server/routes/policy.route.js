import { Router } from 'express';
import {
  addPolicy,
  deletePolicy,
  getAllPolicyList,
} from '../controller/policy.controller.js';

const router = Router();

router.get('/list', getAllPolicyList);
router.post('/add', addPolicy);
router.delete('/:id', deletePolicy);

export const policyRoutes = router;
