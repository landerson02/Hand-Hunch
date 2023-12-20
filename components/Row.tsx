import React from 'react';
import Board from "@/components/Board";
import Guess from "@/components/Guess";
import { BoardType, GuessType, HandType } from "@/objects/types";
import { motion } from "framer-motion";

type rowProps = {
  board: BoardType,
  hand: HandType
  guess: GuessType
  onCardClick: (index: number) => void;
  updateHandStrength: (handStrength: string) => void;
  rowCount: number;
}
const Row = ({board, hand, guess, onCardClick, updateHandStrength, rowCount}: rowProps) => {
  let strength = evaluate(board, hand);
  updateHandStrength(strength);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, z: 1}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4, delay: 0 }}
      className='flex md:flex-row flex-col items-center justify-between w-[100%] p-1'
    >
      <div className={"flex flex-row items-center justify-between w-[100%] "}>
        <div className={"md:w-[20%] w-[30%]"}>
          {guess && guess.cards ? <Guess guess={guess} onCardClick={onCardClick} /> : null}
        </div>
        <div className={"md:w-[60%] w-[70%] flex md:flex-row flex-col"}>
          {board && board.cards ? <Board board={board} boardCount={rowCount}/> : null}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .3, delay: 1.4 }}
          className='hidden md:flex self-right text-center font-semibold text-xl w-[20%] items-center justify-center'
        >
          <div className={"bg-gray-200 border-2 py-2 border-black rounded-md p-5 w-fit"}>
            {strength}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .3, delay: 1.4 }}
        className='md:hidden flex self-right text-center font-semibold text-xs md:text-xl w-[20%] items-center justify-center'
      >
        <div className={"bg-gray-200 border-2 py-2 border-black rounded-md p-5 w-fit"}>
          {strength}
        </div>
      </motion.div>
    </motion.div>
  //
  // <div className='flex justify-evenly w-[100%] p-4' >
  //   {guess && guess.cards ? <Guess guess={guess} onCardClick={onCardClick} /> : null}
  //   {board && board.cards ? <Board board={board}/> : null}
  //   <div className='self-center text-center font-extrabold text-2xl w-[15rem]'>{strength}</div>
  // </div>
  );
};

const evaluate = (board: BoardType, hand: HandType) => {
  if (!board || !board.cards || board.cards.length == 0) return '';
  if (!hand || !hand.cards || hand.cards.length == 0) return '';
  let strength = 0;
  let straight = false;
  let flushSuit = 0;
  let histo = new Array(13).fill(0);
  let suits = new Array(4).fill(0);

  for (let i = 0; i < 5; ++i) {
    const c = board.cards[i];
    ++histo[c.value - 1];
    ++suits[c.suit - 1];
  }

  for (let i = 0; i < 2; ++i) {
    const c = hand.cards[i];
    ++histo[c.value - 1];
    ++suits[c.suit - 1];
  }

  // Checks for Flush
  for (let i = 0; i < 4; ++i) {
    if (suits[i] >= 5) {
      strength = 5;
      flushSuit = i + 1;
    }
  }

  // Checks for Pair, Two Pair, Trips, Straight, Quads
  for (let i = 0, counter = 0; i < 13; ++i) {
    if (histo[i] !== 0) {
      ++counter;
    } else {
      counter = 0;
    }
    if (counter >= 5) {
      strength = Math.max(4, strength);
      straight = true;
    }

    if (histo[i] === 2) {
      switch (strength) {
        case 0:
        case 1:
          strength++;
          break;
        case 3:
          strength = 6;
          break;
      }
    }
    if (histo[i] === 3) {
      switch (strength) {
        case 0:
          strength = 3;
          break;
        case 1:
        case 2:
          strength = 6;
      }
    }
    if (histo[i] === 4) {
      strength = 7;
    }
  }

  // Check broadway Straight
  if (
    histo[0] !== 0 &&
    histo[9] !== 0 &&
    histo[10] !== 0 &&
    histo[11] !== 0 &&
    histo[12] !== 0
  ) {
    strength = Math.max(4, strength);
    straight = true;
  }

  // Checks straight and royal flush
  if (straight && flushSuit !== 0) {
    histo.fill(0);
    for (let c of board.cards) {
      if (c.suit === flushSuit) {
        ++histo[c.value - 1];
      }
    }
    for (let c of board.cards) {
      if (c.suit === flushSuit) {
        ++histo[c.value - 1];
      }
    }
    for (let i = 0, counter = 0; i < 13; ++i) {
      if (histo[i] !== 0) {
        ++counter;
      } else {
        counter = 0;
      }
      if (counter >= 5) {
        strength = 8;
      }
    }

    if (
      histo[0] !== 0 &&
      histo[9] !== 0 &&
      histo[10] !== 0 &&
      histo[11] !== 0 &&
      histo[12] !== 0
    ) {
      strength = 9;
    }
  }

  switch (strength) {
    case 1:
      return 'Pair';
    case 2:
      return 'Two Pair';
    case 3:
      return 'Three of a Kind';
    case 4:
      return 'Straight';
    case 5:
      return 'Flush';
    case 6:
      return 'Full House';
    case 7:
      return 'Four of a Kind';
    case 8:
      return 'Straight Flush';
    case 9:
      return 'Royal Flush';
    default:
      return 'High Card';
  }
}

export default Row;
