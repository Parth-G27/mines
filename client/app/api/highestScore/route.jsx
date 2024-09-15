import axios from "axios";

export const highestScore = async (session) => {
    if(!session) return ;

    try {
        const backend = process.env.NEXT_PUBLIC_API_KEY;
        
        return 3;
    } catch (error) {
        console.log("Error while calling get highest API", error);
    }
}