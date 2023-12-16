import React, {useState, useEffect, useRef} from 'react';
import Board from '../components/Board';
import Card from "@/components/Card";
import { Deck } from "@/objects/deck";
import { Game } from "@/objects/game";
import {BoardType, CardType, CardStatus, GuessType, HandType} from "@/objects/types";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import CardSelect from '@/components/CardSelect';
import GameOver from "@/components/GameOver";
import logo from '@/public/HandHunchLogoCards.png';
import Image from "next/image";
import Help from "@/components/Help";
import ResetGame from "@/components/ResetGame";

export default function Home() {
  const [game, setGame] = useState<Game>(new Game());
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [guesses, setGuesses] = useState<GuessType[]>([]);
  const [hand, setHand] = useState<CardType[]>([]);
  const [curIteration, setCurIteration] = useState<number>(0);
  const [isWin, setWin] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCardSelectOpen, setIsCardSelectOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGame(game);
    setBoards(game.boards);
    setGuesses(game.guesses);
    setHand(game.hand.cards);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        if (scrollRef.current) {
          scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight - 560);
        }
    }
  }, [boards]);

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

  const closeGameOver = () => {
    setIsGameOverOpen(false);
  }

  const openHelp = () => {
    setIsHelpOpen(true);
  }
  const closeHelp = () => {
    setIsHelpOpen(false);
  }

  const closeReset = () => {
    setIsResetOpen(false);
  }

  const deal = () => {
    let guess = game.guesses[curIteration];
    if (guess.cards[0].status == CardStatus.Green && guess.cards[1].status == CardStatus.Green) {
      setWin(true);
      setIsGameOverOpen(true);
      setIsGameOver(true);
      return;
    }
    if (curIteration == 5) {
      setWin(false);
      setIsGameOverOpen(true);
      setIsGameOver(true);
      return;
    }
    guess.current = false;
    game.deal();
    setGame(game);
    setBoards([...game.boards]);
    setGuesses([...game.guesses]);
    setCurIteration(curIteration+1);
    // if (scrollRef.current) {
    //   scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    // }
  }

  const resetGame = () => {
    const newGame = new Game();
    setGame(newGame);
    setBoards([...newGame.boards]);
    setGuesses([...newGame.guesses]);
    setHand([...newGame.hand.cards]);
    setCurIteration(0);
    setWin(false);
    setIsGameOver(false);
    setIsCardSelectOpen(false);
    setIsGameOverOpen(false);
  }

  return (
    <div className='bg-green-700 h-screen'>
      <div className={"absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center align-middle z-0"}>
        <Image src={logo} alt={"Logo"} className={"opacity-40"}/>
      </div>
      <Nav openHelp={openHelp}/>
      <div className={"flex justify-center align-top h-[80%]"}>
        <div className={"w-[80%] h-full"}>
          <div className={"flex justify-between p-1"}>
            <button
                className='z-1 font-extrabold text-2xl bg-green-500 border-2 w-[20%] mt-2 py-2 border-black rounded-md
                  hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => {
                  onSubmitGuess();
                }}>Submit Guess</button>
            <button
                className='z-1 font-extrabold text-2xl bg-red-500 border-2 border-black mt-2 rounded-md w-[20%] py-2
                  hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => {
                  if (!isGameOver) {
                    setIsResetOpen(true);
                  } else {
                    resetGame();
                  }
                }}>Reset Game</button>
          </div>
          <div className='overflow-y-auto h-full mt-3 z-1 no-scrollbar' ref={scrollRef}>
            {boards.map((board, index) => {
              return <Row key={index} board={board} hand={game.hand} guess={game.guesses[index]} onCardClick={onCardSelect}/>
            })}
          </div>
        </div>
      </div>

      <ResetGame isOpen={isResetOpen} closeModal={closeReset} resetGame={resetGame}/>
      <Help isOpen={isHelpOpen} closeModal={closeHelp}/>
      <CardSelect isOpen={isCardSelectOpen} closeModal={closeCardSelect} setGuess={onSetGuess}/>
      {hand[0] && hand[1] && <GameOver isOpen={isGameOverOpen} closeModal={closeGameOver} hand={hand} win={isWin} iteration={curIteration + 1} resetGame={resetGame}/>}
      <button onClick={deal} className='absolute fixed bottom-0 right-0'>DEAL</button>
    </div>
  )
}
