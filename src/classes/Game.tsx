import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';
import Player from './Player';
import MoveHandler from './MoveHandler';
import WinChecker from './WinChecker';

const Game: React.FC = () => {
  const { state } = useLocation();
  const playerXName = state?.playerXName || 'Player X';
  const playerOName = state?.playerOName || 'Player O';

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

    const wasMoveSuccessful = moveHandler.makeMove(column, currentPlayer);
    if (wasMoveSuccessful) {
      const winner = winChecker?.checkForWin();
      if (winner) {
        setGameOver(true);
        alert(`Player ${winner} (${winner === 'X' ? playerX.name : playerO.name}) wins!`);
      } else if (winChecker?.checkForDraw()) {
        setGameOver(true);
        alert('It\'s a draw!');
      } else {
        setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
      }
    }
  };

  return (
    <div>
      <h1>Game Board</h1>
      <Board boardState={boardState} onCellClick={handleCellClick} />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Game;