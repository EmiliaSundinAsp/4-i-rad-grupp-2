import Board from "./Board.js";
import WinChecker from "./winChecker.js";

export default class Player {

  name: string;
  symbol: 'X' | 'O';
  board: Board;
  computerMove: boolean;
  difficulty: 'easy' | 'hard';
  winChecker: WinChecker;

  constructor(name: string, symbol: 'X' | 'O', board: Board, computerMove: boolean = false, difficulty: 'easy' | 'hard' = 'easy') {
    this.name = name;
    this.symbol = symbol;
    this.board = board;
    this.computerMove = computerMove;
    this.difficulty = difficulty;
    this.winChecker = new WinChecker(board);
  }

  makeComputerMove(): number {
    return this.difficulty === 'easy' ? this.makeEasyMove() : this.makeHardMove();
  }



  makeEasyMove(): number {

    const availableColumns = this.board.gameBoard[0]
      .map((_, colIndex) => colIndex)
      .filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');

    if (availableColumns.length === 0) {
      throw new Error('Ingen ledig kolumn.');
    }

    const randomColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    return randomColumn;

  }

  makeHardMove(): number {
    const availableColumns = this.board.gameBoard[0]
      .map((_, colIndex) => colIndex)
      .filter(colIndex => this.board.gameBoard[0][colIndex] === ' ');

    if (availableColumns.length === 0) {
      throw new Error('Ingen ledig kolumn.');
    }

    const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';

    for (const col of availableColumns) {
      if (this.isWinningMove(col, opponentSymbol)) {
        return col; // Blockera om det finns ett hot
      }
    }

    for (const col of availableColumns) {
      const row = this.getRowForColumn(col);
      if (row !== -1 && row < this.board.gameBoard.length - 1 && this.board.gameBoard[row + 1][col] === this.symbol) {
        return col; // Lägg ovanpå en av sina egna brickor
      }
    }
    
//if no better option makeEasyMove
  return this.makeEasyMove();
  }


  getRowForColumn(col: number): number {
    for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
      if (this.board.gameBoard[row][col] === ' ') {
        return row; // Returnera den första lediga raden
      }
    }
    return -1; // column full
}

  isWinningMove(column: number, symbol: 'X' | 'O'): boolean {
    for (let row = this.board.gameBoard.length - 1; row >= 0; row--) {
      if (this.board.gameBoard[row][column] === ' ') {
        this.board.gameBoard[row][column] = symbol;
        const win = this.winChecker.checkForWin() === symbol;
        this.board.gameBoard[row][column] = ' ';
        if (win) {
          return true;
        }
        break;
      }
    }
    return false;
  }
}