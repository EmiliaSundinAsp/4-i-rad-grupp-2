import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



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
      <form onSubmit={handleSubmit}>
        <label htmlFor="yellow-player">Enter yellow player name:</label>
        <input id="yellow-player" type="text" value={playerXName} onChange={(e) => setPlayerXName(e.target.value)} required />

        <label htmlFor="red-player">Enter red player name:</label>
        <input type="text" id="red-player" value={playerOName} onChange={(e) => setPlayerOName(e.target.value)} required />
      </form>
      <button type="submit">Start Game</button>
    </>
  )

}


export default PlayerVsPlayerComponent;