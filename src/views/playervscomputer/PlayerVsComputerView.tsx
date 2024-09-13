import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from '../../components/headercomponent/HeaderComponent';
import './PlayerVsComputerView.css';

const PlayerVsComputer: React.FC = () => {
  const [playerXName, setPlayerXName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');

  const navigate = useNavigate();

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!playerXName || !color || !difficulty) {
      alert('Please fill in all fields!');
      return;
    }

    navigate('/game', {
      state: { playerXName, color, difficulty, isComputerPlayerO: true },
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className="player-vs-computer-wrapper">
        <form onSubmit={handleSubmit} className="player-settings-form">
          <h2 className="player-name-heading">Enter your Name</h2>
          <input
            type="text"
            value={playerXName}
            onChange={(e) => setPlayerXName(e.target.value)}
            placeholder="Enter player name"
            className="player-name-input"
          />

          <h3 className="color-selection-heading">Choose your Color</h3>
          <div className="color-options">
            <button
              type="button"
              className={`color-option ${color === 'red' ? 'color-selected' : ''}`}
              style={{ backgroundColor: 'red' }}
              onClick={() => handleColorSelect('red')}
            >
              Red
            </button>
            <button
              type="button"
              className={`color-option ${color === 'yellow' ? 'color-selected' : ''}`}
              style={{ backgroundColor: 'yellow' }}
              onClick={() => handleColorSelect('yellow')}
            >
              Yellow
            </button>
          </div>

          <h3 className="difficulty-selection-heading">Choose Difficulty</h3>
          <div className="difficulty-options">
            <button
              type="button"
              className={`difficulty-option ${difficulty === 'easy' ? 'difficulty-selected' : ''}`}
              onClick={() => handleDifficultySelect('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`difficulty-option ${difficulty === 'hard' ? 'difficulty-selected' : ''}`}
              onClick={() => handleDifficultySelect('hard')}
            >
              Hard
            </button>
          </div>

          <button type="submit" className="start-game-button">
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerVsComputer;