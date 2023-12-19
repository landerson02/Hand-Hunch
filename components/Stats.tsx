import React from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { FaFire } from "react-icons/fa6";
import { motion } from "framer-motion";
import { StatsObject } from "@/objects/stats";
import { BarChart } from '@mui/x-charts/BarChart';

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

      <motion.div className={"flex flex-col items-center justify-between p-2 h-full"}>
        <div className='font-medium text-4xl'>Statistics</div>

        <div className='w-[90%] h-[65%]'>
          <BarChart
            xAxis={[{
              scaleType: 'band',
              data: ['1', '2', '3', '4', '5', '6'],
              label: 'Guesses',
              labelStyle: {fill: 'black', fontSize: 16, fontWeight: 500},
            }]}
            series={[{ data: stats.guessArray }]} // Combine all data into a single series
            margin={{ top: 30, right: 30, bottom: 50, left: 30 }}
            axisHighlight={{x: 'none', y: 'none'}}
            colors={['#bc9c22']}
          />
        </div>


        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ delay: 0.2 }}
          className={'flex flex-col w-full gap-2 mb-2'}
        >
          {/*<div className='flex justify-around w-full'>*/}
          {/*  <div className='text-3xl font-extralight'>Strongest Hand: <span className={'font-bold'}>{stats.strongestHand}</span></div>*/}
          {/*</div>*/}
          <div className='flex justify-around w-full'>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='text-5xl'>{stats.games}</div>
              <div className='text-xl'>Games</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='text-5xl'>{(stats.winPercentage * 100).toFixed(0)}%</div>
              <div className='text-xl'>Win Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='text-5xl flex justify-center items-center'>{(stats.currentStreak)}<FaFire className='w-7 h-7 text-red-600'/></div>
              <div className='text-xl'>Current</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='text-5xl flex justify-center items-center'>{(stats.longestStreak)}<FaFire className='w-7 h-7 text-black'/></div>
              <div className='text-xl'>Longest</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='text-5xl'>{(stats.averageGuesses)}</div>
              <div className='text-xl'>Avg Guesses</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </Modal>
  );
};

export default Stats;