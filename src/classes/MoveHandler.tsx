import Player from './Player';

export default class MoveHandler {
  boardState: string[][];
  players: Player[];
  updateState: (newBoardState: string[][]) => void;

  constructor(boardState: string[][], players: Player[], updateState: (newBoardState: string[][]) => void) {
    this.boardState = boardState;
    this.players = players;
    this.updateState = updateState;
  }

  makeMove(column: number, currentPlayer: Player): boolean {
    for (let row = this.boardState.length - 1; row >= 0; row--) {
      if (this.boardState[row][column] === ' ') {
        this.boardState[row][column] = currentPlayer.symbol;
        this.updateState(this.boardState);
        return true;
      }
    }
    return false;
  }
}