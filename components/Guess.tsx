import React from 'react';
import Card from "@/components/Card";
import {GuessType, CardType, CardStatus} from "@/objects/types";

type GuessProps = {
  guess: GuessType;
  onCardClick: (index: number) => void;
};

const Guess = ({guess, onCardClick}: GuessProps) => {
  let cards = [];
  cards.push(<Card card={guess.cards[0]} isFlipped={guess.cards[0].suit != 0 && guess.cards[0].value != 0}/>)
  cards.push(<Card card={guess.cards[1]} isFlipped={guess.cards[1].suit != 0 && guess.cards[1].value != 0}/>)

  const statusColor: { [key in CardStatus]: string } = {
    [CardStatus.Unselected]: 'border-4 border-gray-100 border-opacity-0',
    [CardStatus.Selected]: 'border-4 border-gray-100 bg-gray-100 border-opacity-90 rounded',
    [CardStatus.Red]: 'border-4 border-red-500 bg-red-500 border-opacity-90 rounded',
    [CardStatus.Yellow]: 'border-4 border-yellow-300 bg-yellow-300 border-opacity-90 rounded',
    [CardStatus.Green]: 'border-4 border-green-300 bg-green-300 border-opacity-90 rounded'
  };

  return (
    <div className='w-full flex align-middle justify-left'>
      {/*<div className='self-center text-center font-extrabold text-2xl w-[15rem]'>Guess</div>*/}
      <div className='flex w-full justify-center md:gap-7 items-center md:scale-100 scale-[60%]' >
        <div onClick={() => {
          if (guess.current) onCardClick(0);
        }} className={`${guess.current ? "hover:cursor-pointer" : ""} ${statusColor[guess.cards[0].status]}`}>
          {cards[0]}
        </div>
        <div onClick={() => {
          if (guess.current) onCardClick(1);
        }} className={`${guess.current ? "hover:cursor-pointer" : ""} ${statusColor[guess.cards[1].status]}`}>
          {cards[1]}
        </div>
      </div>
    </div>
  );
};

export default Guess;
