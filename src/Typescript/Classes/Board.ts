export default class Board {

  gameBoard: string[][]; // Creates the game board, a 2-dimensional array

  constructor() {
    // Initializes the game bord with 7 columns and 6 rows
    this.gameBoard = Array.from({ length: 6 }, () =>
			Array.from({ length: 7 }, () => ' ')
		);
  }
}