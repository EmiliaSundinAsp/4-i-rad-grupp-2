import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from '../../components/headercomponent/HeaderComponent';
import './ComputerVsComputerView.css';

const ComputerVsComputer: React.FC = () => {
  const [computer1Difficulty, setComputer1Difficulty] = useState<string>('');
  const [computer2Difficulty, setComputer2Difficulty] = useState<string>('');
  const [difficultyErrorCompOne, setDifficultyErrorCompOne] = useState<string>(''); const [difficultyErrorCompTwo, setDifficultyErrorCompTwo] = useState<string>('');


  const navigate = useNavigate();


  const handleComputer1DifficultySelect = (selectedDifficulty: string) => {
    setComputer1Difficulty(selectedDifficulty);
  };


  const handleComputer2DifficultySelect = (selectedDifficulty: string) => {
    setComputer2Difficulty(selectedDifficulty);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!computer1Difficulty) {
      setDifficultyErrorCompOne('Please select a difficulty for Computer 1.');
      hasError = true;
    }

    if (!computer2Difficulty) {
      setDifficultyErrorCompTwo('Please select a difficulty for Computer 2.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    navigate('/game', {
      state: { computer1Difficulty, computer2Difficulty, isComputerPlayerX: true, isComputerPlayerO: true },
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className="computer-vs-computer-wrapper">
        <form onSubmit={handleSubmit} className="computer-settings-form">
          <h2 className="page-title">Computer vs Computer</h2>

          <h3 className="difficulty-selection-heading">Choose Difficulty for <span className="yellow-text">Computer 1</span></h3>
          <div className="difficulty-options">
            <button
              type="button"
              className={`difficulty-option ${computer1Difficulty === 'easy' ? 'difficulty-selected' : ''}`}
              onClick={() => handleComputer1DifficultySelect('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`difficulty-option ${computer1Difficulty === 'hard' ? 'difficulty-selected' : ''}`}
              onClick={() => handleComputer1DifficultySelect('hard')}
            >
              Hard
            </button>
          </div>
          {difficultyErrorCompOne && <p className="error-message">{difficultyErrorCompOne}</p>}
          <h3 className="difficulty-selection-heading">Choose Difficulty for <span className="red-text">Computer 2</span></h3>
          <div className="difficulty-options">
            <button
              type="button"
              className={`difficulty-option ${computer2Difficulty === 'easy' ? 'difficulty-selected' : ''}`}
              onClick={() => handleComputer2DifficultySelect('easy')}
            >
              Easy
            </button>
            <button
              type="button"
              className={`difficulty-option ${computer2Difficulty === 'hard' ? 'difficulty-selected' : ''}`}
              onClick={() => handleComputer2DifficultySelect('hard')}
            >
              Hard
            </button>
          </div>
          {difficultyErrorCompTwo && <p className="error-message">{difficultyErrorCompTwo}</p>}
          <button type="submit" className="start-game-button">
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default ComputerVsComputer;