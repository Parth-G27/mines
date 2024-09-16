"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { highestScore } from "@/app/api/highestScore/route";

const HighestScoreComp = () => {
  const { data: session } = useSession();
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    if (session) {
      getHighestScore();
    }
  }, [session]);

  const getHighestScore = async () => {
    let response = await highestScore(session);
    if (response.data.highestScore) {
      setHighscore(response.data.highestScore);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex justify-center bg-white p-6 rounded-lg my-7 transition-transform transform hover:scale-105">
      {session && (
        <h2 className="text-3xl font-bold text-gray-700 flex items-center">
          <span className="mr-2">🏆</span> High Score:{" "}
          <span className="text-green-800 ml-2">{highscore}</span>
        </h2>
      )}
    </div>
  );
};

export default HighestScoreComp;
