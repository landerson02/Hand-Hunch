import React from 'react';
import Board from "@/components/Board";
import {BoardType} from "@/objects/types";

type rowProps = {
  board: BoardType,
  strength: string
}
const Row = ({board, strength}: rowProps) => {
  return (
    <div className='flex justify-evenly w-[100%]'>
      <div className='self-center font-extrabold text-2xl'>GUESS</div>
      {board && board.cards ? <Board cards={board.cards}/> : null}
      {/*<Board cards={board.cards}/>*/}
      <div className='self-center font-extrabold text-2xl'>{strength}</div>
    </div>
  );
};

export default Row;
