import Board from "./Board.js";

// The WinChecker class checks the game board to see
// if a player has won or if the game has ended in a draw.
export default class WinChecker {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  // Helper method to check if the current symbol has a winning combination.
  private isWinningCombo(symbol: string, row: number, col: number, offsets: number[][]): boolean {
    const b = this.board.gameBoard;
    let symbolsInCombo = '';

    // Iterate through the provided offsets to check for the symbol match.
    for (let [ro, co] of offsets) {
      const newRow = row + ro;
      const newCol = col + co;

      // Ensure we don't go out of bounds on the board.
      if (newRow >= 0 && newRow < b.length && newCol >= 0 && newCol < b[0].length) {
        symbolsInCombo += b[newRow][newCol];
      }
    }

    // Return true if the combination matches the player's symbol.
    return symbolsInCombo === symbol.repeat(4);
  }

  // Checks if there is a winning combination of 4 symbols in a row.
  // It searches horizontally, vertically, and diagonally.
  public checkForWin(): string | boolean {
    const b = this.board.gameBoard;
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]], // Horizontal win.
      [[0, 0], [1, 0], [2, 0], [3, 0]], // Vertical win.
      [[0, 0], [1, 1], [2, 2], [3, 3]], // Diagonal down-right win.
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Diagonal up-right win.
    ];

    // Loop through each player symbol ('X' and 'O') to check for a win.
    for (let symbol of ['X', 'O']) {
      for (let r = 0; r < b.length; r++) {
        for (let c = 0; c < b[0].length; c++) {
          // Check each win type (horizontal, vertical, diagonal).
          for (let winType of offsets) {
            if (this.isWinningCombo(symbol, r, c, winType)) {
              return symbol; // Return the winning symbol.
            }
          }
        }
      }
    }
    return false; // No winner found.
  }

  // Checks if the game is a draw (no winner and the board is full).
  public checkForDraw(): boolean {
    // If no win and no empty spaces, it's a draw.
    return !this.checkForWin() && !this.board.gameBoard.flat().includes(' ');
  }
}
