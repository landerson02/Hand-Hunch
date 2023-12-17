import React from 'react';
import Modal from 'react-modal';
import {IoIosClose} from "react-icons/io";
import {motion} from "framer-motion";

type ResetProps = {
  isOpen: boolean,
  closeModal: () => void,
  resetGame: () => void
}

const ResetGame: React.FC<ResetProps> = ({ isOpen, closeModal, resetGame } : ResetProps) => {
  const customStyles = {
    content: {
      width: '35%', // adjust this value to change the width of the modal
      height: '30%', // adjust this value to change the height of the modal
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
      contentLabel="Reset Game"
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
        <div className={"text-2xl font-semibold"}>New Game</div>
        <div className={"flex flex-col text-center"}>
          <div className={"text-xl"}>Are you sure you want to reset the game?</div>
          <div className={"text-xl"}>This will count as a loss on your stats.</div>
        </div>
        <div className={"flex justify-evenly w-full p-2"}>
          <button
            onClick={() => {resetGame(); closeModal();}}
            className={"text-2xl text-black font-bold hover:bg-red-500 " +
              "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-red-400"}
          >
            Reset Game
          </button>
          <button
            onClick={closeModal}
            className={"text-2xl text-black font-bold hover:bg-green-600 " +
              "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
          >
            Keep Playing
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetGame;