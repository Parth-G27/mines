"use client";

import { useState, useEffect } from 'react';
import { FaGem, FaBomb } from "react-icons/fa";

const GRID_SIZE = 5;
const MINE_COUNT = 3;
const clickSound = "./select.mp3";  // Path to sound file

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

    // Play click sound on each box click
    const audio = new Audio(clickSound);
    audio.play();

    if (newGrid[index].isMine) {
      // If a mine is clicked, reveal all boxes and end the game
      newGrid.forEach((cell, idx) => {
        newGrid[idx] = { ...cell, isRevealed: true };
      });
      setGameOver(true);
    } else {
      setScore(score + 10);
    }

    setGrid(newGrid);
  };

  const renderCell = (cell, index) => {
    let cellContent;
    if (cell.isRevealed) {
      cellContent = cell.isMine ? (
        <FaBomb className="w-8 h-8 text-red-500" />  // FaBomb for mines
      ) : (
        <FaGem className="w-8 h-8 text-green-400" />  // FaGem for gems
      );
    }

    return (
      <div
        key={index}
        className={`w-16 h-16 border-2 border-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
          cell.isRevealed
            ? cell.isMine
              ? 'bg-red-200'
              : 'bg-green-200'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onClick={() => handleCellClick(index)}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Mines</h1>
      <div className="mb-4 text-white text-xl">Score: {score}</div>
      <div className="grid grid-cols-5 gap-2 bg-gray-800 p-4 rounded-xl shadow-lg">
        {grid.map((cell, index) => renderCell(cell, index))}
      </div>
      {gameOver && (
        <div className="mt-8 text-white text-2xl">
          Game Over! Your score: {score}
        </div>
      )}
      <button
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        onClick={initializeGrid}
      >
        New Game
      </button>
    </div>
  );
};

export default Play;
