import { useState } from 'react';

const Board = () => {
  // Creates and initialize the game board using state
  const [Board, setBoard] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => ' '))
  );

  // Function to render the board as JSX
  const renderBoard = () => {
    return (
      <div>
        {Board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((column, colIndex) => (
              <span key={colIndex}>
                {`| ${column}`}
              </span>
            ))}
            <span>|</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Game Board</h1>
      {renderBoard()}
    </div>
  )
};

export default Board;