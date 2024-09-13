import Game from '../models/Game.js';
import User from '../models/User.js';

export const saveGame = async (req, res) => {
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

export const getPlayerGames = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const games = await Game.find({ userId: user._id }).sort({ date: -1 });

    res.status(200).json({ games });
  } catch (error) {
    console.error('Error in getPlayerGames:', error);
    res.status(500).json({ message: 'Error retrieving games' });
  }
};