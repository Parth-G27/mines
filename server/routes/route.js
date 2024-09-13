import express from 'express';
import { createOrUpdateUser } from '../controllers/userController.js';
import { saveGame, getPlayerGames } from '../controllers/gameController.js';

const router = express.Router();

router.post('/api/auth/callback/google', createOrUpdateUser);
router.post('/api/games', saveGame);
router.get('/api/games', getPlayerGames);

export default router;




