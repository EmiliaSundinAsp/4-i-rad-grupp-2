import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/headercomponent/HeaderComponent";
import './PlayerVsPlayer.css';

const PlayerVsPlayerComponent: React.FC = () => {
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');
  const [playerXNameError, setPlayerXNameError] = useState<string>('');
  const [playerONameError, setPlayerONameError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!playerXName) {
      setPlayerXNameError('Please enter a name.');
      hasError = true;
    } else {
      setPlayerXNameError('');
    }

    if (!playerOName) {
      setPlayerONameError('Please enter a name.');
      hasError = true;
    } else {
      setPlayerONameError('');
    }

    if (hasError) return;

    navigate('/game', {
      state: { playerXName, playerOName },
    });
  };

  return (
    <>
      <HeaderComponent />
      <div className="form-container">
        <div className="inside-form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="yellow-player-label" htmlFor="yellow-player">Enter <span className="yellow-text">yellow</span> player name:</label><br />
              <input id="yellow-player" type="text" value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} />
            </div>
            <div>
              {playerXNameError && <p className="error-message">{playerXNameError}</p>}
            </div>

            <div>
              <label className="red-player-label" htmlFor="red-player">Enter <span className="red-text">red</span> player name:</label><br />
              <input type="text" id="red-player" value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} />
            </div>
            <div>
              {playerONameError && <p className="error-message">{playerONameError}</p>}
            </div>

            <div>
              <button className="start-game-button" type="submit">Start Game</button>

            </div>

          </form>
        </div>
      </div >
    </>
  );
}

export default PlayerVsPlayerComponent;