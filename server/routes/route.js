import express from 'express';
import { createOrUpdateUser } from '../controllers/userController.js';
import { saveGame, getPlayerGames } from '../controllers/gameController.js';
import { highestScore } from '../controllers/highestScoreController.js';
import {leaderBoardController } from '../controllers/leaderBoardController.js';
const router = express.Router();

router.post('/api/auth/callback/google', createOrUpdateUser);
router.post('/api/games', saveGame);
router.get('/api/games', getPlayerGames);
router.get('/api/highestscore', highestScore);
router.get('/api/leaderboard', leaderBoardController);

export default router;