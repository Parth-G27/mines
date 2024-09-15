"use client";
import React from 'react'
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { apiHighestScore } from '@/app/api/highestScore/route';

const highestScoreComp = () => {
    const { data: session, status } = useSession();
    const [highscore, sethighscore] = useState(0);
    useEffect(() => {
      if(session){
        console.log("session is true.... for the high comp ");
        getHighestScore();
      }
    
    }, [session])

    const getHighestScore = async () => {
        let response = await apiHighestScore();
        sethighscore(response.data);
        console.log(response.data);
    }
    
  return (
    <>
    <div className='my-4'>
        Highest Score : {highscore}
    </div>
    </>
  )
}

export default highestScoreComp