import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';
import Player from './Player';
import MoveHandler from './MoveHandler';
import WinChecker from './winChecker';
import HeaderComponent from '../components/headercomponent/HeaderComponent';
import Modal from '../components/modalprops/Modal';
import { useNavigate } from 'react-router-dom';



const Game: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const playerXName = state?.playerXName || 'Player X';
  const playerOName = state?.playerOName || 'Player O';


  const difficulty = state?.difficulty || 'easy';
  const isComputerPlayer = state?.isComputerPlayer || false;

  const playerXProfileImage = localStorage.getItem('loggedInUser') === playerXName
    ? localStorage.getItem(`profileImage_${playerXName}`)
    : null;

  const playerOProfileImage = localStorage.getItem('loggedInUser') === playerOName
    ? localStorage.getItem(`profileImage_${playerOName}`)
    : null;

  const [boardState, setBoardState] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => ' '))
  );
  const [playerX] = useState(new Player(playerXName, 'X'));
  const [playerO] = useState(new Player(playerOName, 'O'));
  const [moveHandler, setMoveHandler] = useState<MoveHandler | null>(null);
  const [winChecker, setWinChecker] = useState<WinChecker | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerX);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


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
    setWinnerMessage(null);

  };

  const updateState = (newBoardState: string[][]) => {
    setBoardState(newBoardState);
  };


  // Automatically trigger computer's move when it's its turn
  useEffect(() => {
    if (currentPlayer === playerO && isComputerPlayer && !gameOver && moveHandler) {
      // Delay to simulate thinking time
      setTimeout(() => {
        const computerMove = playerO.makeComputerMove(boardState, difficulty);
        const moveResult = moveHandler.makeMove(computerMove, playerO);

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
            // Switch turn to player X (human)
            setCurrentPlayer(playerX);
          }
        }
      }, 500); // 500ms delay for computer "thinking"
    }
  }, [currentPlayer, gameOver, moveHandler, boardState, playerO, difficulty, winChecker, playerX]);




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
          setWinnerMessage(`${winner === 'X' ? playerX.name : playerO.name} wins!`);

          console.log('Player X profile image:', playerXProfileImage);
          console.log('Player O profile image:', playerOProfileImage);
          if (winner === 'X') {
            playerX.addWin();
          } else if (winner === 'O') {
            playerO.addWin();
          }

        } else if (winChecker?.checkForDraw()) {
          setGameOver(true);
          setWinnerMessage("It's a draw!");
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
          setWinnerMessage(`Player ${winner === 'X' ? playerX.name : playerO.name} wins!`);
        } else if (winChecker?.checkForDraw()) {
          setGameOver(true);
          setWinnerMessage("It's a draw!");
        } else {
          // change player
          setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
        }
      }
    }
  };

  const handleQuitGame = () => {
    setShowModal(true)
  };

  const confirmQuitGame = () => {
    setShowModal(false);
    navigate('/');
  };

  const cancelQuitGame = () => {
    setShowModal(false);
  };

  return (
    <div className='container'>
      <HeaderComponent />
      <Modal
        show={showModal}
        title="Quit Game"
        message="Are you sure you want to quit the game?"
        onConfirm={confirmQuitGame}
        onCancel={cancelQuitGame}
      />
      <div className='left-column'>
        <div className='player-turn-container'>
          {winnerMessage ? (
            <>
              <h1 className='winner-message'>{winnerMessage}</h1>
              {winnerMessage.includes(playerX.name) && playerXProfileImage ? (
                <img
                  src={playerXProfileImage}
                  alt="Winner's profile"
                  className="player-profile-image"
                />
              ) : winnerMessage.includes(playerO.name) && playerOProfileImage ? (
                <img
                  src={playerOProfileImage}
                  alt="Winner's profile"
                  className="player-profile-image"
                />
              ) : null}
            </>
          ) : (
            <>
              <h1 className='player-turn'>It's your turn, <br />{currentPlayer.name}</h1>
              {currentPlayer === playerX && playerXProfileImage ? (
                <img
                  src={playerXProfileImage}
                  alt={`${playerX.name}'s profile`}
                  className="player-profile-image"
                />
              ) : currentPlayer === playerO && playerOProfileImage ? (
                <img
                  src={playerOProfileImage}
                  alt={`${playerO.name}'s profile`}
                  className="player-profile-image"
                />
              ) : null}
            </>
          )}
        </div>

        <div>
          <h2>ScoreBoard</h2>
          <p>{playerX.name}: {playerX.wins} wins</p>
          <p>{playerO.name}: {playerO.wins} wins</p>
        </div>
        <div className='btn-container'>
          <button onClick={resetGame} className='reset-btn'>Reset Game</button>
          <button onClick={handleQuitGame} className='quit-game-btn'>Quit game</button>
        </div>
      </div >
      <div className='right-column'>
        <div className='board-container'><Board boardState={boardState} onCellClick={handleCellClick} /></div>


      </div>

    </div >
  );
};

export default Game;