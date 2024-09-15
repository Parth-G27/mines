import Game from '../models/Game.js';
import User from '../models/User.js';

export const highestScore = async (req, res) => {
    const { email, score } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const game = new Game({
        userId: user._id,
        score
      });
  
      await game.save();
  
      res.status(201).json({ message: 'Game saved successfully', game });
    } catch (error) {
      console.error('Error in saveGame:', error);
      res.status(500).json({ message: 'Error saving game' });
    }
  };