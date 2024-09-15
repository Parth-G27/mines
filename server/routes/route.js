import express from 'express';
import { createOrUpdateUser } from '../controllers/userController.js';
import { saveGame, getPlayerGames } from '../controllers/gameController.js';
import { highestScore } from '../controllers/highestScoreController.js';
const router = express.Router();

router.post('/api/auth/callback/google', createOrUpdateUser);
router.post('/api/games', saveGame);
router.get('/api/games', getPlayerGames);
router.get('/api/highestscore', highestScore);

export default router;