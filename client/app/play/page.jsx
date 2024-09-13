"use client";

import { useState, useEffect } from "react";
import { FaGem, FaBomb } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();

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
        <FaBomb className="w-10 h-10 text-red-500" />
      ) : (
        <FaGem className="w-10 h-10 text-emerald-400" />
      );
    }

    return (
      <div
        key={index}
        className={`w-20 h-20 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          cell.isRevealed
            ? cell.isMine
              ? "bg-red-100 border-red-300"
              : "bg-emerald-100 border-emerald-300"
            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-md"
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          score: score,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save game');
      }

      console.log('Game saved successfully');
      fetchPlayerGames(); // Refresh the player's games list
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const fetchPlayerGames = async () => {
    if (!session) return;

    try {
      const response = await fetch(`${backendUrl}/api/games?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch player games');
      }

      const data = await response.json();
      setPlayerGames(data.games);
    } catch (error) {
      console.error('Error fetching player games:', error);
    }
  };

  return (
    <div className="min-h-screen items-center justify-center">
      <div className="flex flex-col min-w-full items-center bg-white p-8 rounded-3xl shadow-2xl mx-8 mb-8">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-lime-400 via-[#11a401] to-lime-400 bg-clip-text text-transparent my-8">
          Mine Rush
        </h1>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <p className="relative text-xl mb-9 md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-green-600 py-2 px-4 rounded-lg shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Hi, {session.user?.name}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-6 rounded-2xl shadow-inner">
          {grid.map((cell, index) => renderCell(cell, index))}
        </div>
        {gameOver ? (
          <div className="mt-7 mb-3 text-gray-800 text-4xl font-bold animate-bounce">
            Game Over! Your score: {score}
          </div>
        ) : (
          <div className="mt-7 mb-3 text-gray-700 text-4xl font-bold">
            Your Score: {score}
          </div>
        )}

        <button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xl font-bold rounded-full hover:from-emerald-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
          onClick={initializeGrid}
        >
          New Game
        </button>

        {/* {gameOver && session && (
          <button
            className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xl font-bold rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            onClick={saveGame}
          >
            Save Game
          </button>
        )} */}

        {session && playerGames.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Recent 5 Games</h2>
            <ul className="space-y-2">
              {playerGames.slice(0, 5).map((game, index) => (
                <li key={index} className="text-lg">
                  Score: {game.score} - Date: {new Date(game.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;