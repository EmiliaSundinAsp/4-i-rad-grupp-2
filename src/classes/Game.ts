import Board from "./Board.js";
import MoveHandler from "./MoveHandler.js";
import Player from "./Player.js";
import WinChecker from "./WinChecker.js";

export default class Game {
  board: Board;
  playerX!: Player;
  playerO!: Player;
  moveHandler: MoveHandler;
  winChecker: WinChecker;
  currentPlayer!: Player;
  gameOver: boolean;

  constructor() {
    this.board = new Board();
    this.gameOver = false;
    this.createPlayer();

    while (true) {
      this.board = new Board();
      this.winChecker = new WinChecker(this.board);
      this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this, this.updateState.bind(this));

      this.startGameLoop();

      const playAgain = this.askYesOrNo('Do you want to play again with the same names? (yes/no): ');
      if (playAgain === 'yes') {
        this.resetGame();
      } else {
        const changeNames = this.askYesOrNo('Do you want to start the game with new names? (yes/no): ');
        if (changeNames === 'yes') {
          this.createPlayer();
          this.resetGame();
          continue;
        } else {
          console.log('Thank you for playing!');
          break;
        }
      }
    }
  }

  resetGame() {
    this.board = new Board();
    this.winChecker = new WinChecker(this.board);
    this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this, this.updateState.bind(this));
    this.gameOver = false;

    this.currentPlayer = this.playerX;
    console.log(`${this.currentPlayer.name} starts the game as ${this.currentPlayer.symbol}.`);
  }

  askYesOrNo(question: string): 'yes' | 'no' {
    // Placeholder for actual implementation
    console.log(question);
    // Replace with actual UI input logic
    return 'yes'; // or 'no'
  }

  createPlayer() {
    console.clear();
    console.log('Welcome to Four-in-a-Row!');

    const playerXName = 'Player X'; // Replace with actual UI input
    const playerOType: 'yes' | 'no' = 'no'; // Replace with actual UI input

    let playerOName: string;
    let isComputer: boolean = false;

    if (playerOType === 'yes') {
      playerOName = 'Computer';
      isComputer = true;
    } else {
      playerOName = 'Player O'; // Replace with actual UI input
    }

    this.playerX = new Player(playerXName, 'X', this.board, false);
    this.playerO = new Player(playerOName, 'O', this.board, isComputer);

    this.currentPlayer = this.playerX;

    console.log(`${this.currentPlayer.name} starts the game as ${this.currentPlayer.symbol}.`);

    // Placeholder for UI interaction
    console.log('Press Enter to continue...');
  }

  startGameLoop() {
    while (!this.gameOver) {
      console.clear();
      this.board.render();

      if (this.currentPlayer.computerMove) {
        this.moveHandler.makeMove(-1);
      } else {
        // Placeholder for user move
        const move = '1'; // Replace with actual UI input
        const column = +move.trim() - 1;

        if (!this.moveHandler.makeMove(column)) {
          console.log('Invalid move. Try again.');
          console.log('Press Enter to continue...');
          continue;
        }
      }

      if (!this.gameOver) {
        continue;
      }
      console.log('Press Enter to exit...');
    }
  }

  updateState() {
    // Placeholder function for stateUpdater
    console.log('State updated');
  }
}