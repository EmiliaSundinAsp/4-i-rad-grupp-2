import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from '../../components/headercomponent/HeaderComponent';
import './PlayerVsComputerView.css';

const PlayerVsComputer: React.FC = () => {
  const [playerXName, setPlayerXName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [colorError, setColorError] = useState<string>('');
  const [difficultyError, setDifficultyError] = useState<string>('');
  const [playerXNameError, setPlayerXNameError] = useState<string>('');

  const navigate = useNavigate();

  const handleColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setColorError('');
  };

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setDifficultyError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!playerXName) {
      setPlayerXNameError('Please enter a name.');
      hasError = true;
    } else {
      setPlayerXNameError('');
    }

    if (!color) {
      setColorError('Please select a color.');
      hasError = true;
    } else {
      setColorError('');
    }

    if (!difficulty) {
      setDifficultyError('Please select a difficulty.');
      hasError = true;
    } else {
      setDifficultyError('');
    }




    if (hasError) return;

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
          {playerXNameError && <p className="error-message">{playerXNameError}</p>}

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
          {colorError && <p className="error-message">{colorError}</p>}

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
          {difficultyError && <p className="error-message">{difficultyError}</p>}
          <button type="submit" className="start-game-button">
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerVsComputer;