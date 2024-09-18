"use client";

import { useState, useEffect } from "react";
import { FaGem, FaBomb } from "react-icons/fa";
import { useSession } from "next-auth/react";
import HighestScoreCompo from "@/components/highestScoreComp";
import Link from "next/link";

const GRID_SIZE = 5;
const MINE_COUNT = 3;
const gemSound = "/audio/gemsound.mp3";
const mineSound = "/audio/minesound.wav";
const backendUrl = process.env.NEXT_PUBLIC_API_KEY;

const Play = () => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerGames, setPlayerGames] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    initializeGrid();
    if (session) {
      fetchPlayerGames();
    }
  }, [session]);

  const initializeGrid = () => {
    let newGrid = Array(GRID_SIZE * GRID_SIZE).fill({
      isMine: false,
      isRevealed: false,
    });
    let minesPlaced = 0;

    while (minesPlaced < MINE_COUNT) {
      const randomIndex = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[randomIndex].isMine) {
        newGrid[randomIndex] = { ...newGrid[randomIndex], isMine: true };
        minesPlaced++;
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setScore(0);
  };

  const handleCellClick = (index) => {
    if (gameOver || grid[index].isRevealed) return;

    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], isRevealed: true };

    if (newGrid[index].isMine) {
      const audio = new Audio(mineSound);
      audio.play();
      newGrid.forEach((cell, idx) => {
        newGrid[idx] = { ...cell, isRevealed: true };
      });
      saveGame();
      setGameOver(true);
    } else {
      const audio = new Audio(gemSound);
      audio.play();
      setScore(score + 10);
    }

    setGrid(newGrid);
  };

  const renderCell = (cell, index) => {
    let cellContent;
    if (cell.isRevealed) {
      cellContent = cell.isMine ? (
        <FaBomb className="w-6 h-6 md:w-12 md:h-12 text-red-500" />
      ) : (
        <FaGem className="w-6 h-6 md:w-12 md:h-12 text-emerald-400" />
      );
    }

    return (
      <div
        key={index}
        className={`w-12 h-12 md:w-24 md:h-24 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          cell.isRevealed
            ? cell.isMine
              ? "bg-red-100 border-red-300"
              : "bg-emerald-100 border-emerald-300"
            : "bg-white border-gray-200 hover:bg-gray-200 hover:border-gray-400 shadow-md"
        }`}
        onClick={() => handleCellClick(index)}
      >
        {cellContent}
      </div>
    );
  };

  const saveGame = async () => {
    if (!session) return;

    try {
      const response = await fetch(`${backendUrl}/api/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          score: score,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save game");
      }

      fetchPlayerGames(); // Refresh the player's games list
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  const fetchPlayerGames = async () => {
    if (!session) return;

    try {
      const response = await fetch(
        `${backendUrl}/api/games?email=${session.user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch player games");
      }

      const data = await response.json();
      setPlayerGames(data.games);
    } catch (error) {
      console.error("Error fetching player games:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col w-full md:max-w-6xl items-center bg-white p-6 md:p-8 rounded-3xl shadow-2xl mx-4 md:mx-8 mb-12">
        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-lime-400 via-[#11a401] to-lime-400 bg-clip-text text-transparent my-6 md:my-8">
          Mine Rush
        </h1>

        <div className="flex items-center space-x-2 md:space-x-4">
          {session ? (
            <>
              <p className="text-lg md:text-2xl mb-10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-green-600 py-2 px-4 rounded-lg shadow-lg  hover:scale-105 hover:shadow-xl">
                Hi, {session.user?.name}
              </p>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-4 bg-gray-100 p-4 md:p-6 rounded-2xl shadow-inner">
          {grid.map((cell, index) => renderCell(cell, index))}
        </div>

        {gameOver ? (
          <div className="mt-5 md:mt-7 mb-3 text-gray-800 text-xl md:text-4xl font-bold animate-bounce">
            Game Over! Your score: {score}
          </div>
        ) : (
          <div className="mt-5 md:mt-7 mb-3 text-gray-700 text-2xl md:text-4xl font-bold">
            Your Score : {score} 
          </div>
        )}

        <button
          className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-lg md:text-xl font-bold rounded-full hover:from-emerald-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
          onClick={initializeGrid}
        >
          New Game
        </button>

        {session && playerGames.length > 0 && (
          <div className="mt-8 w-full md:w-[50%] bg-white p-4 md:p-6 rounded-lg shadow-md">
            <center>
              <h2 className="text-2xl md:text-3xl font-semibold text-green-600 mb-4 md:mb-6">
                Your Recent 5 Games
              </h2>
            </center>
            <ul className="space-y-3 md:space-y-4">
              {playerGames.slice(0, 5).map((game, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-green-100 to-emerald-50 p-4 rounded-md shadow-sm transition-transform transform hover:scale-105"
                >
                  <span className="text-lg md:text-xl font-semibold text-green-700">
                    Score: {game.score}
                  </span>
                  <span className="text-sm md:text-base font-medium text-gray-500">
                    {new Date(game.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <HighestScoreCompo />

        <div className="flex flex-row justify-end items-start mt-4 w-full">
          <Link
            href="/leaderboard"
            className="relative px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 sm:hover:scale-105 md:hover:scale-110"
          >
            <span className="relative z-10">Leaderboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Play;
