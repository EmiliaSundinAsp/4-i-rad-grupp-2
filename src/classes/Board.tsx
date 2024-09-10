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
      <div className='game-board'>
        {Board.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((column, colIndex) => (
              <div key={colIndex} onClick={() => handleColumnClick(colIndex)} className='cell'>
                {column === 'R' ? (
                  <div className='piece red-piece' />
                ) : column === 'Y' ? (
                    <div className='piece yellow-piece' />
                  ) : (
                      <div className='piece empty-piece' />
                )}
              </div>
            ))}
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