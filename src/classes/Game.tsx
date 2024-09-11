import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';
import Player from './Player';
import MoveHandler from './MoveHandler';
import WinChecker from './winChecker';
import HeaderComponent from '../components/headercomponent/HeaderComponent';


const Game: React.FC = () => {
  const { state } = useLocation();
  const playerXName = state?.playerXName || 'Player X';
  const playerOName = state?.playerOName || 'Player O';

  const difficulty = state?.difficulty || 'easy';
  const isComputerPlayer = state?.isComputerPlayer || false;

  const [boardState, setBoardState] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => ' '))
  );
  const [playerX] = useState(new Player(playerXName, 'X'));
  const [playerO] = useState(new Player(playerOName, 'O'));
  const [moveHandler, setMoveHandler] = useState<MoveHandler | null>(null);
  const [winChecker, setWinChecker] = useState<WinChecker | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerX);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => ' '));
    const newWinChecker = new WinChecker(newBoard);
    const newMoveHandler = new MoveHandler(newBoard, [playerX, playerO], updateState);

    setBoardState(newBoard);
    setWinChecker(newWinChecker);
    setMoveHandler(newMoveHandler);
    setCurrentPlayer(playerX);
    setGameOver(false);
  };

  const updateState = (newBoardState: string[][]) => {
    setBoardState(newBoardState);
  };

  const handleCellClick = (column: number) => {
    if (gameOver || !moveHandler) return;

  if (currentPlayer === playerO && isComputerPlayer) {
    const computerMove = playerO.makeComputerMove(boardState, difficulty);
    const moveResult = moveHandler.makeMove(computerMove, playerO);

    // after 
    if (typeof moveResult === 'string') {
      alert(moveResult);
    } else if (moveResult === true) {
      const winner = winChecker?.checkForWin();
      if (winner) {
        setGameOver(true);
        if (winner === 'X') {
          playerX.addWin();
        } else if (winner === 'O') {
          playerO.addWin();
        }
        alert(`Player ${winner} (${winner === 'X' ? playerX.name : playerO.name}) wins!`);
      } else if (winChecker?.checkForDraw()) {
        setGameOver(true);
        alert("It's a draw!");
      } else {
        // change turn
        setCurrentPlayer(playerX);
      }
    }
  } else {
    //human
    const moveResult = moveHandler.makeMove(column, currentPlayer);    
    if (typeof moveResult === 'string') {
      alert(moveResult);
    } else if (moveResult === true) {
      const winner = winChecker?.checkForWin();
      if (winner) {
        setGameOver(true);
        if (winner === 'X') {
          playerX.addWin();
        } else if (winner === 'O') {
          playerO.addWin();
        }
        alert(`Player ${winner} (${winner === 'X' ? playerX.name : playerO.name}) wins!`);
      } else if (winChecker?.checkForDraw()) {
        setGameOver(true);
        alert("It's a draw!");
      } else {
        // Byt till datorn om det inte är game over
        setCurrentPlayer(playerO);
      }
    }
  }
};

  return (
    <div className='container'>
      <HeaderComponent />
      <div className='left-column'>
        <div className='player-turn-container'>
          <h1 className='player-turn'>{currentPlayer.name} turn</h1>
        </div>
        <div>
          <h2>ScoreBoard</h2>
          <p>{playerX.name}: {playerX.wins} wins</p>
          <p>{playerO.name}: {playerO.wins} wins</p>
        </div>
        <div className='btn-container'>
          <button onClick={resetGame} className='reset-btn'>Reset Game</button>
        </div>
      </div>
      <div className='right-column'>
        <div className='board-container'><Board boardState={boardState} onCellClick={handleCellClick} /></div>
        <div className='btn-container'>
          <button className='quit-game-btn'>Quit game</button>
        </div>

      </div>
    </div>
  );
};

export default Game;