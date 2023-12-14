import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Card from "@/components/Card";
import { Deck } from "@/objects/deck";
import { Game } from "@/objects/game";
import {BoardType, CardType, GuessType} from "@/objects/types";
import Nav from "@/components/Nav";
import Row from "@/components/Row";

export default function Home() {
  const [game, setGame] = useState<Game>(new Game());
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [guess, setGuess] = useState<GuessType>();
  const [handStrength, setHandStrength] = useState<string>('');


  useEffect(() => {
    setGame(game);
    setBoards(game.boards);
  }, []);

  const handleGuessSubmit = () => {

  }

  const deal = () => {
    game.deal();
    setGame(game);
    console.log(game);
    setBoards([...game.boards]);
  }

  // for (let i = 0; i < game.boards.length; i++) {
  //   let board = game.boards[i];
  //   boards.push(<Board cards = {board.cards}/>);
  // }

  return (
      <>
        <Nav />
        {boards.map((board, index) => {
          return <Row key={index} board={board} hand={game.hand}/>
        })}
        <button className='fixed bottom-10 left-1/2 font-extrabold text-4xl'
          onClick={() => {
          deal();
        }}>Deal</button>
      </>
  )
}
