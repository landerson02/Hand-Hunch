import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { FaFire } from "react-icons/fa6";
import {motion} from "framer-motion";
import { StatsObject } from "@/objects/stats";
import { BarChart } from '@mui/x-charts/BarChart';
import {UserContext} from "@/contexts/userContext";
import {StatsContext} from "@/contexts/StatsContext";

type StatsProps = {
  isOpen: boolean,
  closeModal: () => void,
  openSignIn: () => void,
}

const Stats: React.FC<StatsProps> = ({ isOpen, closeModal, openSignIn } : StatsProps) => {
  const userContext = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn, username, setUsername, setPassword, setUserStats, userStats } = userContext;
  const statsContext = useContext(StatsContext);
  const { stats, setStats } = statsContext;

  useEffect(() => {
    if(isLoggedIn) {
      setStats(userStats);
    } else {
      const stats = localStorage.getItem('stats');
      if(stats) {
        const parsed = JSON.parse(stats);
        const newStats = new StatsObject();
        Object.assign(newStats, parsed);
        setStats(newStats);
      }
    }
  }, [isLoggedIn]);

  const customStyles = {
    content: {
      width: '80%', // adjust this value to change the width of the modal
      height: '50%', // adjust this value to change the height of the modal
      maxHeight: '22rem', // overrides the height to make the modal scrollable
      maxWidth: '35rem', // overrides the width to make the modal scrollable
      margin: 'auto', // centers the modal in the middle of the screen
      padding: 0,
      backgroundColor: 'white', // make the modal solid white
      outline: 'solid 1px black',
      overflow: 'hidden',
    },
    overlay: {
      backgroundColor: 'transparent', // make the background transparent
    },
  };


  const signOut = () => {
    // Reset user data
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserStats(new StatsObject());
  }

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
        <div className='font-medium md:text-4xl text-3xl'>Statistics</div>

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
              <div className='md:text-5xl text-3xl'>{stats.games}</div>
              <div className='md:text-xl text-xs'>Games</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='md:text-5xl text-3xl'>{(stats.winPercentage * 100).toFixed(0)}%</div>
              <div className='md:text-xl text-xs'>Win Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='md:text-5xl text-3xl flex justify-center items-center'>{(stats.currentStreak)}<FaFire className='md:w-7 md:h-7 h-5 w-5 text-red-600'/></div>
              <div className='md:text-xl text-xs'>Current</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='md:text-5xl text-3xl flex justify-center items-center'>{(stats.longestStreak)}<FaFire className='md:w-7 md:h-7 h-5 w-5 text-black'/></div>
              <div className='md:text-xl text-xs'>Longest</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className='flex flex-col justify-center items-center'
            >
              <div className='md:text-5xl text-3xl'>{(stats.averageGuesses).toFixed(2)}</div>
              <div className='md:text-xl text-xs'>Avg Guesses</div>
            </motion.div>
          </div>
        </motion.div>
        {!isLoggedIn ? (
          <div className={'flex gap-1 justify-center items-center'}>
            <button onClick={openSignIn} className={'ml-2 text-blue-500 hover:underline'}>Sign in</button>
            <div>to save your data</div>
          </div>
        ) : (
          <div className={'flex gap-12 justify-center items-center'}>
            <div>Signed in as: {username}</div>
            <button onClick={signOut} className={'ml-2 text-blue-500 hover:underline'}>Sign Out</button>
          </div>
        )}
      </motion.div>

    </Modal>
  );
};

export default Stats;