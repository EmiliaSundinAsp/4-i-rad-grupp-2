import React, { useState } from 'react';

const Board = () => {
  // Creates and initialize the game board using state
  const [Board, setBoard] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => ' '))
  );
}

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
}
/*
  // Function to render the game board in the console
render() {
  const line = '\n' + '-'.repeat(29) + '\n';
  console.log(
    line +
    this.gameBoard.map(row =>
      row.map(column => `| ${column} `).join('') + '|').join(line) + line
  );
}
  */

export default Board;