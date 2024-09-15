import WinChecker from './winChecker';

export default class Player {
  name: string;
  symbol: 'X' | 'O';
  wins: number;

  constructor(name: string, symbol: 'X' | 'O') {
    this.name = name;
    this.symbol = symbol;
    this.wins = 0;
  }
  addWin() {
    this.wins +=1;
  }

  makeComputerMove(boardState: string[][], difficulty: 'easy' | 'hard'): number {
    return difficulty === 'easy' ? this.makeEasyMove(boardState) : this.makeHardMove(boardState);
  }

  private makeEasyMove(boardState: string[][]): number {
    const availableColumns = boardState[0]
      .map((_, colIndex) => colIndex)
      .filter(colIndex => boardState[0][colIndex] === ' ');

    if (availableColumns.length === 0) {
      throw new Error('No available columns.');
    }

    //checks if it is reached and selects a number
    const chosenColumn = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    console.log('computer chosen column', chosenColumn);

    return chosenColumn;
  }

  private makeHardMove(boardState: string[][]): number {
    // Implement harder move logic here
        const availableColumns = boardState[0]
      .map((_, colIndex) => colIndex)
      .filter(colIndex => boardState[0][colIndex] === ' ');

    if (availableColumns.length === 0) {
      throw new Error('No emty column.');
    }

    const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';

    for (const col of availableColumns) {
        if (this.isWinningMove(boardState, col, this.symbol)) {
            return col;
        }
    }

    for (const col of availableColumns) {
      if (this.isWinningMove(boardState, col, opponentSymbol)) {
        return col;
      }
    }

    for (const col of availableColumns) {
      const row = this.getRowForColumn(boardState, col);
      if (row !== -1 && row < boardState.length - 1 && boardState[row + 1][col] === this.symbol) {
        return col;
      }
    }


    return this.makeEasyMove(boardState);
  }

    getRowForColumn(boardState: string[][], col: number): number {
    for (let row = boardState.length - 1; row >= 0; row--) {
      if (boardState[row][col] === ' ') {
        return row;
      }
    }
    return -1;
}

  isWinningMove(boardState: string[][], column: number, symbol: 'X' | 'O'): boolean {
    for (let row = boardState.length - 1; row >= 0; row--) {
      if (boardState[row][column] === ' ') {
        boardState[row][column] = symbol;
        const winChecker = new WinChecker(boardState);
        const result = winChecker.checkForWin();
        const win = result !== null && result.symbol === symbol;
        boardState[row][column] = ' ';
        return win;
      }
    }
    return false;
  }
}