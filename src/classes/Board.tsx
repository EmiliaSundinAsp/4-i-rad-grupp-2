import { useState } from 'react';



/*
gameBoard: string[][]; // Creates the game board, a 2-dimensional array
*/

const Board = () => {
  // Creates and initialize the game board using state
  const [Board, setBoard] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => ' '))
  );
}
/*
constructor() {
  // Initializes the game bord with 7 columns and 6 rows
  this.gameBoard = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => ' ')
  );
}
*/

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
