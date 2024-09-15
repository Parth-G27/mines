import Game from '../models/Game.js';
import User from '../models/User.js';

export const highestScore = async (req, res) => {
    const { email } = req.body;
  
    try {
        console.log("i am in highestScore in backend",email);
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
  
    //   const game = new Game({
    //     userId: user._id,
    //     score
    //   });
  
    //   await game.save();
    const games = 8;
    res.status(200).json( games );
    } catch (error) {
      console.error('Error in saveGame:', error);
      res.status(500).json({ message: 'Error saving game' });
    }
  };