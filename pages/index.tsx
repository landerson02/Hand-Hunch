import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Card from "@/components/Card";
import { Deck } from "@/objects/deck";
import { Game } from "@/objects/game";
import {BoardType, CardType, CardStatus, GuessType} from "@/objects/types";
import Nav from "@/components/Nav";
import Row from "@/components/Row";

export default function Home() {
  const [game, setGame] = useState<Game>(new Game());
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [guess, setGuesses] = useState<GuessType[]>([]);
  const [curIteration, setCurIteration] = useState<number>(0);

  useEffect(() => {
    setGame(game);
    setBoards(game.boards);
    setGuesses(game.guesses);
  }, []);

  const handleGuessSubmit = (index: number) => {

  }

  const onCardSelect = (index: number) => {
    console.log(index);
    let guess = game.guesses[curIteration]
    guess.cards[0].status = index == 0 ? CardStatus.Selected: CardStatus.Unselected;
    guess.cards[1].status = index == 1 ? CardStatus.Selected: CardStatus.Unselected;
    guess.selectedCardIndex = index;
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
  }

  const deal = () => {
    game.guesses[curIteration].cards[0].status = CardStatus.Unselected;
    game.guesses[curIteration].cards[1].status = CardStatus.Unselected;
    game.guesses[curIteration].current = false;
    game.deal();
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
    setCurIteration(curIteration+1);
  }

  // for (let i = 0; i < game.boards.length; i++) {
  //   let board = game.boards[i];
  //   boards.push(<Board cards = {board.cards}/>);
  // }

  return (
    <div className='bg-green-700 h-screen'>
        <Nav />
        {boards.map((board, index) => {
          return <Row key={index} board={board} hand={game.hand} guess={game.guesses[index]} onCardClick={onCardSelect}/>
        })}
        <button className='fixed bottom-10 left-1/2 font-extrabold text-4xl'
          onClick={() => {
          deal();
        }}>Deal</button>
    </div>
  )
}
