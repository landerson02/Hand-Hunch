import React from 'react';
import Modal from 'react-modal';
import {IoIosClose} from "react-icons/io";
import { FaFire } from "react-icons/fa6";
import {motion} from "framer-motion";
import {StatsObject} from "@/objects/stats";

type StatsProps = {
  isOpen: boolean,
  closeModal: () => void,
  stats: StatsObject
}

const Stats: React.FC<StatsProps> = ({ isOpen, closeModal, stats } : StatsProps) => {
  const customStyles = {
    content: {
      width: '40%', // adjust this value to change the width of the modal
      height: '60%', // adjust this value to change the height of the modal
      maxHeight: '40rem', // overrides the height to make the modal scrollable
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
      contentLabel="Settings"
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
        <div className={"text-2xl font-semibold"}>Stats</div>
        <div className={"flex justify-around w-full"}>
          <div className={"text-2xl"}>Games: {stats.games}</div>
          <div className={"text-2xl"}>Win Rate: {(stats.winPercentage * 100).toFixed(0)}%</div>
          <div className={"text-2xl"}>Average Guesses: {stats.averageGuesses.toFixed(2)}</div>
        </div>
        <div className={"flex justify-around w-full"}>
          <div className={"text-2xl"}>Current Streak: {stats.currentStreak}</div>
          <div className={"text-2xl"}>Longest Streak: {stats.longestStreak}</div>
        </div>
        <div className={"flex justify-around w-full"}>
          <div className={"text-2xl"}>Strongest Hand: {stats.strongestHand}</div>
        </div>
        <div className={"flex flex-col align-middle w-[90%] h-[45%] border-2 mb-10"}>
          <div className={"text-xl text-center"}>[ADD CHART]</div>
        </div>
      </div>
    </Modal>
  );
};

export default Stats;