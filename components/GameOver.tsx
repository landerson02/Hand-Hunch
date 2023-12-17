import React from 'react';
import Modal from 'react-modal';
import {IoIosClose} from "react-icons/io";
import {CardStatus, CardType} from "@/objects/types";
import Card from "@/components/Card";
import {motion} from "framer-motion";

type GameOverProps = {
  isOpen: boolean,
  closeModal: () => void,
  hand: CardType[],
  win: boolean,
  iteration: number
  resetGame: () => void,
  openStats: () => void
}

const GameOver: React.FC<GameOverProps> = ({ isOpen, closeModal, hand, win, iteration, resetGame, openStats } : GameOverProps) => {
  // console.log(hand);
  let message = "";
  let statusColor = "";
  if (win) {
    hand[0].status = CardStatus.Green;
    hand[1].status = CardStatus.Green;
    message = "You guessed the right hand in " + iteration + " tries!";
    statusColor = 'border-4 border-green-500 bg-green-500 border-opacity-90 rounded'
  } else {
    hand[0].status = CardStatus.Red;
    hand[1].status = CardStatus.Red;
    message = "You didn't guess the right hand in " + iteration + " tries.";
    statusColor = 'border-4 border-red-500 bg-red-500 border-opacity-90 rounded'
  }

  const customStyles = {
    content: {
      width: '40%', // adjust this value to change the width of the modal
      height: '45%', // adjust this value to change the height of the modal
      maxHeight: '20rem', // overrides the height to make the modal scrollable
      minWidth: '35rem', // overrides the width to make the modal scrollable
      margin: 'auto', // centers the modal in the middle of the screen
      padding: 0,
      backgroundColor: 'white', // make the modal solid white
      outline: 'solid 1px black',
    },
    overlay: {
      backgroundColor: 'transparent', // make the background transparent
    },
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Game Over"
      ariaHideApp={false}
    >
      <motion.button
        onClick={closeModal}
        className={"absolute top-0 left-0"}
        whileHover={{ scale: 1.2 }}
      >
        <IoIosClose className={"text-red-600 w-12 h-12"}/>
      </motion.button>
      <div className={"flex flex-col items-center justify-between p-2 h-full"}>
        <div className={"text-2xl font-semibold"}>Game Over</div>
        <div className={"text-xl font-semibold"}>{message}</div>
        <div className='flex justify-center gap-7 items-center' >
          <div className={statusColor}>
            <Card card={hand[0]} isFlipped={true}/>
          </div>
          <div className={statusColor}>
            <Card card={hand[1]} isFlipped={true}/>
          </div>
        </div>
        <div className={"flex justify-evenly w-full p-2"}>
          <button
            onClick={resetGame}
            className={"text-2xl text-black font-bold hover:bg-green-600 " +
              "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
          >
            Play Again
          </button>
          <button
            onClick={openStats}
            className={"text-2xl text-black font-bold hover:bg-green-600 " +
              "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
          >
            See Stats
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOver;