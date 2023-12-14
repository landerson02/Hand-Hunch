import React from 'react';
import Card from "@/components/Card";
import {BoardType} from "@/objects/types";

type BoardProps = {
  board: BoardType
}

const Board = ({board}: BoardProps) => {
  let cards = [];
  for (let i = 0; i < board.cards.length; i++) {
    let card = board.cards[i];
    cards.push(<Card card={card}/>)
  }
  return (
    <div className='w-[50rem]'>
      <div className='flex justify-center gap-7 items-center' >
        {cards.map((card) => {
          return card;
        })}
      </div>
    </div>
  );
};

export default Board;
