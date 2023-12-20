import React, { useEffect, useState } from 'react';
import Card from "@/components/Card";
import { BoardType } from "@/objects/types";
import { motion } from "framer-motion";

type BoardProps = {
  board: BoardType
  boardCount: number
}

const Board = ({board, boardCount}: BoardProps) => {
  const [flippedCards, setFlippedCards] = useState<number>(0);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      if (flippedCards < board.cards.length) {
        setFlippedCards((prevFlippedCards) => {
          if (prevFlippedCards < board.cards.length) {
            return prevFlippedCards + 1;
          } else {
            return prevFlippedCards;
          }
        });
      }
    }, 250);
    return () => clearInterval(flipInterval);
  }, [board]);

  return (
    <div className='w-full'>
      <div className='flex justify-center md:gap-7 items-center md:scale-100 scale-[80%]'>
        {board.index < boardCount-1 ? (
          board.cards.map((card, index) => {
            return (
              <div key={index}>
                <Card card={card} isFlipped={true}/>
              </div>
            );
          })
        ) : (
          board.cards.map((card, index) => {
            return (
              <motion.div
                key = {index}
                initial={{rotateY: 180}}
                animate={{rotateY: 0}}
                transition={{delay: index*0.25 + .205}}
              >
                {/* change in b is 1/10th change in m */}
                <Card card={card} isFlipped={index < flippedCards}/>
              </motion.div>
            );
          })
        )}


        {/*{board.cards.map((card,index) => {*/}
        {/*  return (*/}
        {/*    <motion.div*/}
        {/*      key = {index}*/}
        {/*      initial={{rotateY: 180}}*/}
        {/*      animate={{rotateY: 0}}*/}
        {/*      transition={{delay: index*0.25 + .205}}*/}
        {/*    >*/}
        {/*       change in b is 1/10th change in m*/}
              {/*<Card card={card} isFlipped={index < flippedCards}/>*/}
            {/*</motion.div>*/}
          {/*);*/}
        {/*})}*/}
      </div>
    </div>
  );
};

export default Board;
