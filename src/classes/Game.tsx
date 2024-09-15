import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';
import Player from './Player';
import MoveHandler from './MoveHandler';
import WinChecker from './winChecker';
import HeaderComponent from '../components/headercomponent/HeaderComponent';
import Modal from '../components/modalprops/Modal';
import logo from '../assets/logo2.svg';
import { useNavigate } from 'react-router-dom';



const Game: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const playerXName = state?.playerXName || 'Player X';
  const playerOName = state?.playerOName || 'Player O';


  const difficulty = state?.difficulty || 'easy';
  const isComputerPlayerX = state?.isComputerPlayerX || false;
  const isComputerPlayerO = state?.isComputerPlayerO || false;

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
  const [winningPositions, setWinningPositions] = useState<[number, number][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


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
    setWinningPositions([]);
  };

  const updateState = (newBoardState: string[][]) => {
    setBoardState(newBoardState);
  };


  // Automatically trigger computer's move when it's its turn
  useEffect(() => {
    if ((currentPlayer === playerO && isComputerPlayerO || currentPlayer === playerX && isComputerPlayerX) && !gameOver && moveHandler) {
      // Delay to simulate thinking time
      setTimeout(() => {
        const computerMove = currentPlayer.makeComputerMove(boardState, difficulty);
        const moveResult = moveHandler.makeMove(computerMove, currentPlayer);

        if (typeof moveResult === 'string') {
          setErrorMessage(moveResult);
        } else if (moveResult === true) {
          setErrorMessage(null);
          const winnerResult = winChecker?.checkForWin();
          if (winnerResult && typeof winnerResult !== 'boolean') {
            const { symbol, positions } = winnerResult;
            setGameOver(true);
            setWinningPositions(positions);

            if (symbol === 'X') {
              playerX.addWin();
            } else if (symbol === 'O') {
              playerO.addWin();
            }
            setWinnerMessage(`${symbol === 'X' ? playerX.name : playerO.name} wins!`);
          } else if (winChecker?.checkForDraw()) {
            setGameOver(true);
            setWinnerMessage("It's a draw!");
          } else {
            // Switch turn to player X (human)
            setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
          }
        }
      }, 500); // 500ms delay for computer "thinking"
    }
  }, [currentPlayer, gameOver, moveHandler, boardState, playerO, difficulty, winChecker, playerX]);


  const handleCellClick = (column: number) => {
    if (gameOver || !moveHandler) return;

    if (currentPlayer === playerO && isComputerPlayerO || currentPlayer === playerX && isComputerPlayerX) {
      const computerMove = currentPlayer.makeComputerMove(boardState, difficulty);
      const moveResult = moveHandler.makeMove(computerMove, currentPlayer);

      // after
      if (typeof moveResult === 'string') {
        setErrorMessage(moveResult);
      } else if (moveResult === true) {
        setErrorMessage(null);
        const winnerResult = winChecker?.checkForWin();
        if (winnerResult && typeof winnerResult !== 'boolean') {
          const { symbol, positions } = winnerResult;
          setGameOver(true);
          setWinningPositions(positions);
          setWinnerMessage(`${symbol === 'X' ? playerX.name : playerO.name} wins!`);

          if (symbol === 'X') {
            playerX.addWin();
          } else if (symbol === 'O') {
            playerO.addWin();
          }


          const updatedBoard = boardState.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              return positions.some(([r, c]) => r === rowIndex && c === colIndex)
                ? piece
                : piece;
            })
          );
          setBoardState(updatedBoard);
        } else if (winChecker?.checkForDraw()) {
          setGameOver(true);
          setWinnerMessage("It's a draw!");
        } else {
          // change turn
          setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
        }
      }
    } else {
      // human player
      const moveResult = moveHandler.makeMove(column, currentPlayer);
      if (typeof moveResult === 'string') {
        setErrorMessage(moveResult);
      } else if (moveResult === true) {
        setErrorMessage(null);
        const winnerResult = winChecker?.checkForWin();
        if (winnerResult && typeof winnerResult !== 'boolean') {
          const { symbol, positions } = winnerResult;
          setGameOver(true);
          setWinningPositions(positions);
          setWinnerMessage(`Player ${symbol === 'X' ? playerX.name : playerO.name} wins!`);

          if (symbol === 'X') {
            playerX.addWin();
          } else if (symbol === 'O') {
            playerO.addWin();
          }


          const updatedBoard = boardState.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              return positions.some(([r, c]) => r === rowIndex && c === colIndex)
                ? piece
                : piece;
            })
          );
          setBoardState(updatedBoard);
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
    <>
      <HeaderComponent />
      <div className='container'>

        <Modal
          show={showModal}
          title="Quit Game"
          message="Are you sure you want to quit the game?"
          onConfirm={confirmQuitGame}
          onCancel={cancelQuitGame}
        />


        <div className='left-column'>
          <div className='player-turn-container'>
            <img src={logo} alt="Logo" className='logo-game' />
            {winnerMessage ? (
              <div className='turn-info'>
                <h1 className='winner-message' style={{ color: winnerMessage?.includes(playerXName) ? 'yellow' : 'red' }}>{winnerMessage}</h1>
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

              </div>

            ) : (

              <div className='turn-info'>
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
                <h1 className='player-turn'>It's your turn,
                  <span className='player-name' style={{ color: currentPlayer.symbol === 'X' ? 'yellow' : 'red' }}>{currentPlayer.name}</span>
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className='right-wrapper'>
          <div className='btn-container'>
            <div className='score-board'>
              <h2>ScoreBoard</h2>
              <p>{playerX.name}: {playerX.wins} wins</p>
              <p>{playerO.name}: {playerO.wins} wins</p>
            </div>
            <div className='buttons'>
              <button onClick={resetGame} className='reset-btn'>Reset Game</button>
              <button onClick={handleQuitGame} className='quit-game-btn'>Quit game</button>
            </div>
          </div>


          <div className='right-column'>
            <Board boardState={boardState} onCellClick={handleCellClick} winningPositions={winningPositions} errorMessage={errorMessage ?? undefined} />

          </div>

        </div>

      </div >
    </>

  );
};

export default Game;