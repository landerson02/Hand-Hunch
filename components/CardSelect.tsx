import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import {CardType} from "@/objects/types";
import { SettingsContext } from "@/contexts/SettingsContext";

type CardSelectProps = {
  isOpen: boolean,
  closeModal: () => void,
  setGuess: (suit: number, value: number) => void,
  selectedCard: CardType
}

const CardSelect: React.FC<CardSelectProps> = ({ isOpen, closeModal, setGuess, selectedCard } : CardSelectProps) => {
  const [selectedSuit, setSelectedSuit] = useState<number>(selectedCard.suit);
  const [selectedValue, setSelectedValue] = useState<number>(selectedCard.value);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSuit(selectedCard.suit);
    setSelectedValue(selectedCard.value);
    setWarning(false);
  }, [isOpen]);

  const onSelect = () => {
    if (selectedSuit == 0 || selectedValue == 0) {
      setWarning(true);
      return;
    }
    setGuess(selectedSuit, selectedValue);
    closeModal();
  }

  const customStyles = {
    content: {
      width: '80%', // adjust this value to change the width of the modal
      height: '45%', // adjust this value to change the height of the modal
      maxHeight: '20rem', // overrides the height to make the modal scrollable
      maxWidth: '35rem', // overrides the width to make the modal scrollable
      margin: 'auto', // centers the modal in the middle of the screen
      padding: 0,
      backgroundColor: 'white', // make the modal solid white
      outline: 'solid 1px black',
    },
    overlay: {
      backgroundColor: 'transparent', // make the background transparent
    },
  };
  const settingsContext = React.useContext(SettingsContext);
  if(!settingsContext) throw new Error("SettingsContext is null");
  const { bgColor } = settingsContext;
  // bg-gray-800
  const unselected = 'border-2 rounded-md border-black border-opacity-0';
  let lightColor;
  switch (bgColor) {
    case 'bg-red-900':
      lightColor = 'bg-red-300';
      break;
    case 'bg-green-700':
      lightColor = 'bg-green-300';
      break;
    case 'bg-blue-900':
      lightColor = 'bg-blue-300';
      break;
    case 'bg-purple-900':
      lightColor = 'bg-purple-300';
      break;
    case 'bg-pink-300':
      lightColor = 'bg-pink-200';
      break;
    case 'bg-gray-900':
      lightColor = 'bg-gray-300 ';
      break;
    default:
      throw new Error("bgColor is not a valid color");
  }
  const selected = 'border-2 rounded-md border-black border-opacity-40 ' + lightColor;
  // const hover = 'hover:bg-green-200 hover:border-opacity-40';
  const hover = 'hover:scale-110 transition duration-200 ease-in-out';
  const moveUp = 'transform hover:translate-y-[-4px] transition duration-200 ease-in-out';
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Card Select"
      ariaHideApp={false}
    >
      <motion.button
        onClick={closeModal}
        className={"absolute top-0 left-0"}
        whileHover={{ scale: 1.2 }}
      >
        <IoIosClose className={"text-red-600 w-12 h-12"}/>
      </motion.button>
      <motion.div
        className={"flex flex-col items-center justify-between p-2 h-full"}
      >
        <div className={"md:text-4xl text-3xl font-medium"}>Guess Card</div>
        <div className={"flex flex-col items-center w-full md:p-6 p-2"}>
          <div className={"flex md:flex-row flex-col md:justify-around justify-center w-full gap-3"}>
            <div className={"grid md:grid-cols-2 grid-cols-4 w-[65%] md:w-fit gap-2 self-center"}>
              <button onClick={() => setSelectedSuit(1)} className={`${selectedSuit == 1 ? selected : unselected} ${hover}`}>
                <BsSuitSpadeFill className={"w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(2)} className={`${selectedSuit == 2 ? selected : unselected} ${hover}`}>
                <BsSuitHeartFill className={"text-red-600 w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(3)} className={`${selectedSuit == 3 ? selected : unselected} ${hover}`}>
                <BsSuitDiamondFill className={"text-red-600 w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(4)} className={`${selectedSuit == 4 ? selected : unselected} ${hover}`}>
                <BsSuitClubFill className={"w-9 h-9"}/>
              </button>
            </div>
            <div className={"grid grid-cols-7 gap-2 text-4xl font-thin"}>
              <button onClick={() => setSelectedValue(1)} className={`${selectedValue == 1 ? selected : unselected} ${hover}`}>
                A
              </button>
              <button onClick={() => setSelectedValue(2)} className={`${selectedValue == 2 ? selected : unselected} ${hover}`}>
                2
              </button>
              <button onClick={() => setSelectedValue(3)} className={`${selectedValue == 3 ? selected : unselected} ${hover}`}>
                3
              </button>
              <button onClick={() => setSelectedValue(4)} className={`${selectedValue == 4 ? selected : unselected} ${hover}`}>
                4
              </button>
              <button onClick={() => setSelectedValue(5)} className={`${selectedValue == 5 ? selected : unselected} ${hover}`}>
                5
              </button>
              <button onClick={() => setSelectedValue(6)} className={`${selectedValue == 6 ? selected : unselected} ${hover}`}>
                6
              </button>
              <button onClick={() => setSelectedValue(7)} className={`${selectedValue == 7 ? selected : unselected} ${hover}`}>
                7
              </button>
              <button onClick={() => setSelectedValue(8)} className={`${selectedValue == 8 ? selected : unselected} ${hover}`}>
                8
              </button>
              <button onClick={() => setSelectedValue(9)} className={`${selectedValue == 9 ? selected : unselected} ${hover}`}>
                9
              </button>
              <button onClick={() => setSelectedValue(10)} className={`${selectedValue == 10 ? selected : unselected} ${hover}`}>
                10
              </button>
              <button onClick={() => setSelectedValue(11)} className={`${selectedValue == 11 ? selected : unselected} ${hover}`}>
                J
              </button>
              <button onClick={() => setSelectedValue(12)} className={`${selectedValue == 12 ? selected : unselected} ${hover}`}>
                Q
              </button>
              <button onClick={() => setSelectedValue(13)} className={`${selectedValue == 13 ? selected : unselected} ${hover}`}>
                K
              </button>
            </div>
          </div>
          {warning ? <div className={"text-red-600 text-xs pt-2"}>Select a Suit and Value</div> : null}
        </div>
        <motion.button
          whileHover={
            bgColor==='bg-gray-900' ? { backgroundColor: '#D1D5DB', transition: { duration: 0.2 } }
            : bgColor==='bg-red-900' ? { backgroundColor: '#FCA5A5', transition: { duration: 0.2 } }
              : bgColor==='bg-green-700' ? { backgroundColor: '#86EFAC', transition: { duration: 0.2 }}
                : bgColor==='bg-blue-900' ? { backgroundColor: '#93C5FD', transition: { duration: 0.2 }}
                  : bgColor==='bg-purple-900' ? { backgroundColor: '#D8B4FE', transition: { duration: 0.2 }}
                      :{ backgroundColor: '#FBCFE8', transition: { duration: 0.2 }}}
          whileTap={{ scale: 0.9 }}
          onClick={onSelect}
          className={`md:text-2xl text-xl text-black font-bold
            border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-white-100`}
        >
          Select
        </motion.button>
      </motion.div>
    </Modal>
  );
};

export default CardSelect;