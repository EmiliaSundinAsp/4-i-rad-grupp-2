import WinChecker from './WinChecker';

export default class Player {
  name: string;
  symbol: 'X' | 'O';

  constructor(name: string, symbol: 'X' | 'O') {
    this.name = name;
    this.symbol = symbol;
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

    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  }

  private makeHardMove(boardState: string[][]): number {
    // Implement harder move logic here
    return this.makeEasyMove(boardState); // Temporary: Implement more complex logic for 'hard'
  }

  isWinningMove(boardState: string[][], column: number, symbol: 'X' | 'O'): boolean {
    for (let row = boardState.length - 1; row >= 0; row--) {
      if (boardState[row][column] === ' ') {
        boardState[row][column] = symbol;
        const winChecker = new WinChecker(boardState);
        const win = winChecker.checkForWin() === symbol;
        boardState[row][column] = ' ';
        return win;
      }
    }
    return false;
  }
}