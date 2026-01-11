import { Router } from 'express';
import {
  getTopAccessedContents,
  getTopLeaderboardRankings,
} from '../controller/leaderboard.controller.js';

const router = Router();

router.get('/leaderboard-rankings', getTopLeaderboardRankings);
router.get('/top-accessed-contents', getTopAccessedContents);

export const contentRoutes = router;
