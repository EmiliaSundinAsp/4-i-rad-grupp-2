import { useState, useEffect } from 'react'

import Board from './Board.js'
import MoveHandler from './MoveHandler.js'
import Player from './Player.js'
import WinChecker from './WinChecker.js'


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

    this.gameOver = false
    this.createPlayer();

    while (true) {

      this.board = new Board();
      this.winChecker = new WinChecker(this.board);
      this.moveHandler = new MoveHandler(this.board, [this.playerX, this.playerO], this);


  }


}