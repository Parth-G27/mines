import axios from "axios";

export const LeaderBoardAPI = async () => {

    try {
        const backend = process.env.NEXT_PUBLIC_API_KEY;
         
        
        return await axios.get(`${backend}/api/leaderboard`);
    } catch (error) {
        console.log("Error while calling get highest API", error);
    }
}