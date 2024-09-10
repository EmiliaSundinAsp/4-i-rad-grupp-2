import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/headercomponent/HeaderComponent";
import './PlayerVsPlayer.css';



const PlayerVsPlayerComponent: React.FC = () => {
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              <label htmlFor="yellow-player" className="yellow-player-label">Enter <span className="yellow-text">yellow</span> player name:</label><br />
              <input id="yellow-player" type="text" value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="red-player" className="red-player-label">Enter <span className="red-text">red</span> player name:</label><br />
              <input type="text" id="red-player" value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} required />
            </div>
            <div>
              <button className="start-game-button" type="submit">Start Game</button>
            </div>

          </form>

        </div>
      </div>
    </>
  )

}


export default PlayerVsPlayerComponent;