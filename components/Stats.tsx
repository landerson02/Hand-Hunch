import React from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { FaFire } from "react-icons/fa6";
import { motion } from "framer-motion";
import { StatsObject } from "@/objects/stats";


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
      {/*<div className={"flex flex-col items-center justify-between p-2 h-full"}>*/}
      {/*  <div className={"text-2xl font-semibold"}>Stats</div>*/}
      {/*  <div className={"flex justify-around w-full"}>*/}
      {/*    <div className={"text-2xl"}>Games: {stats.games}</div>*/}
      {/*    <div className={"text-2xl"}>Win Rate: {(stats.winPercentage * 100).toFixed(0)}%</div>*/}
      {/*    <div className={"text-2xl"}>Average Guesses: {stats.averageGuesses.toFixed(2)}</div>*/}
      {/*  </div>*/}
      {/*  <div className={"flex justify-around w-full"}>*/}
      {/*    <div className={"text-2xl"}>Current Streak: {stats.currentStreak}</div>*/}
      {/*    <div className={"text-2xl"}>Longest Streak: {stats.longestStreak}</div>*/}
      {/*  </div>*/}
      {/*  <div className={"flex justify-around w-full"}>*/}
      {/*    <div className={"text-2xl"}>Strongest Hand: {stats.strongestHand}</div>*/}
      {/*  </div>*/}
      {/*  <div className={"flex flex-col align-middle w-[90%] h-[45%] border-2 mb-10"}>*/}
      {/*    <div className={"text-xl text-center"}>[ADD CHART]</div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <motion.div className={"flex flex-col items-center justify-between p-2 h-full"}>
        <div className='font-medium text-4xl'>Statistics</div>

        <div className='flex justify-around w-50 h-50 border-2'>

        </div>


        <div className={'flex flex-col w-full gap-2'}>
          <div className='flex justify-around w-full'>
            <div className='text-3xl font-extralight'>Strongest Hand: <span className={'font-bold'}>{stats.strongestHand}</span></div>
          </div>
          <div className='flex justify-around w-full'>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl'>{stats.games}</div>
              <div className='text-xl'>Games</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl'>{(stats.winPercentage * 100).toFixed(0)}%</div>
              <div className='text-xl'>Win Rate</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl flex justify-center items-center'>{(stats.currentStreak)}<FaFire className='w-7 h-7 text-red-600'/></div>
              <div className='text-xl'>Current</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl flex justify-center items-center'>{(stats.longestStreak)}<FaFire className='w-7 h-7 text-black'/></div>
              <div className='text-xl'>Longest</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='text-5xl'>{(stats.averageGuesses)}</div>
              <div className='text-xl'>Avg Guesses</div>
            </div>
          </div>
        </div>
      </motion.div>

    </Modal>
  );
};

export default Stats;