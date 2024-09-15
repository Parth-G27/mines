import axios from "axios";

export const highestScore = async (session) => {
    if(!session) return ;

    try {
        const backend = process.env.NEXT_PUBLIC_API_KEY;
        console.log(session.user.email);
        //axios.get(`${backend}/api/highestscore?email=${session.user.email}`) 
        
        return await 4;
    } catch (error) {
        console.log("Error while calling get highest API", error);
    }
}