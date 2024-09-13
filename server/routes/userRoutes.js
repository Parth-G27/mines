import express from 'express';
import { createOrUpdateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/api/auth/callback/google', createOrUpdateUser);

export default router;