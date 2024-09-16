import Game from "../models/Game.js";
import User from "../models/User.js";

export const highestScore = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userId = user._id;

    const highestScoreGame = await Game.findOne({ userId })
      .sort({ score: -1 }) 
      .limit(1);


    if (highestScoreGame) {
      return res.status(200).json({ highestScore: highestScoreGame.score });
    } else {
      return res.status(404).json({ message: 'No games found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching highest score:', error);
    res.status(500).json({ message: "Error fetching highest score" });
  }
};

