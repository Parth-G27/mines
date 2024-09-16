import axios from "axios";

export const highestScore = async (session) => {
    if(!session) return ;

    try {
        const backend = process.env.NEXT_PUBLIC_API_KEY;
         
        
        return await axios.get(`${backend}/api/highestscore?email=${session.user.email}`);
    } catch (error) {
        console.log("Error while calling get highest API", error);
    }
}