import React from 'react';
import Board from '../components/Board';
import Card from "@/components/Card";
import { Deck } from "@/objects/deck";
import { Game } from "@/objects/game";
import {BoardType, CardType} from "@/objects/types";
import Nav from "@/components/Nav";

export default function Home() {
  let game = new Game();
  game.deal();
  game.deal();
  let boards = []
  for (let i = 0; i < game.boards.length; i++) {
    let board = game.boards[i];
    boards.push(<Board cards = {board.cards}/>);
  }

  return (
      <>
        <Nav />
        {boards.map((board) => {
          return board;
        })}
      </>
  )
}
