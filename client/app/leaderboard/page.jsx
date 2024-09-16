"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LeaderBoardAPI } from "@/app/api/leaderBoard/route";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const getLeaderBoard = async () => {
    try {
      let response = await LeaderBoardAPI();
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <section className="min-h-screen p-3">
      <h1 className="head_text_2 text-center">
        <br className="max-md:hidden" />
        <div className="bluegreen_gradient_2 text-center mb-5">Mines Rush</div>
        Top Players, Big Wins: The Mines Rush Hall of Fame!
      </h1>

      <div className="flex flex-col items-center justify-center gap-8">
        {leaderboardData.length > 0 ? (
          leaderboardData.map((player, index) => (
            <div
              key={index}
              className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 transition transform hover:scale-105 duration-300"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="rounded-full border-2 border-green-500 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-bold text-green-900">
                  {player.name}
                </h2>
              </div>
              <div className="text-green-800 font-bold text-xl">
                Highest Score: {player.highestScore}
              </div>
            </div>
          ))
        ) : (
          <p className="text-green-800">Loading leaderboard...</p>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
