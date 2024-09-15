export default class WinChecker {
  boardState: string[][];

  constructor(boardState: string[][]) {
    this.boardState = boardState;
  }

  private isWinningCombo(symbol: string, row: number, col: number, offsets: number[][]): [number, number][] | null {
    let positions: [number, number][] = [];

    for (let [ro, co] of offsets) {
      const newRow = row + ro;
      const newCol = col + co;

      if (newRow >= 0 && newRow < this.boardState.length && newCol >= 0 && newCol < this.boardState[0].length) {
        if (this.boardState[newRow][newCol] === symbol) {
          positions.push([newRow, newCol]);
        } else {
          return null;
        }
      } else {
        return null;
      }
    }


    return positions.length === 4 ? positions : null;
  }

  public checkForWin(): { symbol: string, positions: [number, number][] } | null {
    const offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]], // Horizontal win.
      [[0, 0], [1, 0], [2, 0], [3, 0]], // Vertical win.
      [[0, 0], [1, 1], [2, 2], [3, 3]], // Diagonal down-right win.
      [[0, 0], [1, -1], [2, -2], [3, -3]] // Diagonal up-right win.
    ];

    for (let symbol of ['X', 'O']) {
      for (let r = 0; r < this.boardState.length; r++) {
        for (let c = 0; c < this.boardState[0].length; c++) {
          for (let winType of offsets) {
            const winningPositions = this.isWinningCombo(symbol, r, c, winType);
            if (winningPositions) {
              return { symbol, positions: winningPositions };
            }
          }
        }
      }
    }
    return null;
  }


  public checkForDraw(): boolean {
    return !this.checkForWin() && !this.boardState.flat().includes(' ');
  }
}