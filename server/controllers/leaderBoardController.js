import Game from "../models/Game.js";
import User from "../models/User.js";

export const leaderBoardController = async (req, res) => {
  try {
    const leaderboard = await Game.aggregate([
      {
        $group: {
          _id: "$userId", 
          highestScore: { $max: "$score" } 
        }
      },
      {
        $sort: { highestScore: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "users", 
          localField: "_id", 
          foreignField: "_id", 
          as: "userDetails" 
        }
      },
      {
        $unwind: "$userDetails" 
      },
      {
        $project: {
          _id: 0, 
          email: "$userDetails.email",
          name: "$userDetails.name",
          image: "$userDetails.image",
          highestScore: 1
        }
      }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error in leaderBoardController:", error);
    res.status(500).json({ message: "Error retrieving leaderboard" });
  }
};
