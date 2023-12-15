import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Card from "@/components/Card";
import { Deck } from "@/objects/deck";
import { Game } from "@/objects/game";
import {BoardType, CardType, CardStatus, GuessType} from "@/objects/types";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import CardSelect from '@/components/CardSelect';

export default function Home() {
  const [game, setGame] = useState<Game>(new Game());
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [guess, setGuesses] = useState<GuessType[]>([]);
  const [curIteration, setCurIteration] = useState<number>(0);
  const [isCardSelectOpen, setIsCardSelectOpen] = useState(false);

  useEffect(() => {
    setGame(game);
    setBoards(game.boards);
    setGuesses(game.guesses);
  }, []);

  const onCardSelect = (index: number) => {
    let guess = game.guesses[curIteration];
    guess.cards[0].status = index == 0 ? CardStatus.Selected: CardStatus.Unselected;
    guess.cards[1].status = index == 1 ? CardStatus.Selected: CardStatus.Unselected;
    guess.selectedCardIndex = index;
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
    setIsCardSelectOpen(true);
  }

  const onSetGuess = (suit: number, value: number) => {
    let guess = game.guesses[curIteration];
    guess.cards[guess.selectedCardIndex].suit = suit;
    guess.cards[guess.selectedCardIndex].value = value;
    guess.cards[guess.selectedCardIndex].status = CardStatus.Unselected;
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
  }

  const onSubmitGuess = () => {
    let guess = game.guesses[curIteration];
    if (guess.cards[0].suit == 0 || guess.cards[0].value == 0 || guess.cards[1].suit == 0 || guess.cards[1].value == 0) {
      return;
    }
    guess.validateGuess(game.hand);
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
    deal();
  }

  const closeCardSelect = () => {
    setIsCardSelectOpen(false);
    let guess = game.guesses[curIteration];
    guess.cards[0].status = CardStatus.Unselected;
    guess.cards[1].status = CardStatus.Unselected;
    guess.selectedCardIndex = -1;
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
  }

  const deal = () => {
    game.guesses[curIteration].current = false;
    game.deal();
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
    setCurIteration(curIteration+1);
  }

  return (
    <div className='bg-green-700 h-screen'>
        <Nav />
        <div className='overflow-y-auto h-[77%] pt-2'>
          {boards.map((board, index) => {
            return <Row key={index} board={board} hand={game.hand} guess={game.guesses[index]} onCardClick={onCardSelect}/>
          })}
        </div>
        <button className='fixed bottom-5 left-1/2 font-extrabold text-4xl bg-green-500 border-2 border-black rounded-md px-4 py-2 transform -translate-x-1/2 hover:bg-green-600'
          onClick={() => {
          onSubmitGuess();
        }}>Submit Guess</button>
        <CardSelect isOpen={isCardSelectOpen} closeModal={closeCardSelect} setGuess={onSetGuess}/>
    </div>
  )
}
