"use client";

import { useState, useEffect } from 'react';
import { FaGem, FaBomb } from "react-icons/fa";

const GRID_SIZE = 5;
const MINE_COUNT = 3;
const gemSound = '/audio/gemsound.mp3';
const mineSound = '/audio/minesound.wav';

const Play = () => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    let newGrid = Array(GRID_SIZE * GRID_SIZE).fill({ isMine: false, isRevealed: false });
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

    // const audio = new Audio(clickSound);
    // audio.play();

    if (newGrid[index].isMine) {
      const audio = new Audio(mineSound);
      audio.play();
      newGrid.forEach((cell, idx) => {
        newGrid[idx] = { ...cell, isRevealed: true };
      });
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
              ? 'bg-red-100 border-red-300'
              : 'bg-emerald-100 border-emerald-300'
            : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-md'
        }`}
        onClick={() => handleCellClick(index)}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen items-center justify-center">
      <div className="flex flex-col min-w-full items-center bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className="text-7xl font-bold bg-gradient-to-r  from-lime-400 via-[#11a401] to-lime-400 bg-clip-text text-transparent my-8">Mine Rush</h1>
        <div className="mb-6 text-gray-700 text-2xl font-semibold">Score: {score}</div>
        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-6 rounded-2xl shadow-inner">
          {grid.map((cell, index) => renderCell(cell, index))}
        </div>
        {gameOver && (
          <div className="mt-8 text-gray-800 text-2xl font-bold animate-bounce">
            Game Over! Your score: {score}
          </div>
        )}
        <button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-emerald-400 to-blue-500 text-white text-xl font-bold rounded-full hover:from-emerald-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
          onClick={initializeGrid}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Play;