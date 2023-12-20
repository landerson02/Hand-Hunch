import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import {CardType} from "@/objects/types";

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
      width: '40%', // adjust this value to change the width of the modal
      height: '40%', // adjust this value to change the height of the modal
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
  const smCustomStyles = {
    content: {
      width: '40%', // adjust this value to change the width of the modal
      height: '40%', // adjust this value to change the height of the modal
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
  const unselected = 'border-2 rounded-md border-black border-opacity-0'
  const selected = 'border-2 rounded-md border-black bg-green-300 border-opacity-40'
  // const hover = 'hover:bg-green-200 hover:border-opacity-40'
  const hover = 'hover:scale-110 transition duration-200 ease-in-out'
  const moveUp = 'transform hover:translate-y-[-4px] transition duration-200 ease-in-out'
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
        <div className={"text-4xl font-medium"}>Guess Card</div>
        <div className={"flex flex-col items-center w-full p-6"}>
          <div className={"flex justify-around w-full"}>
            <div className={"grid grid-cols-2 gap-2"}>
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
              <button onClick={() => setSelectedValue(1)} className={`${selectedValue == 1 ? selected : unselected} ${moveUp}`}>
                A
              </button>
              <button onClick={() => setSelectedValue(2)} className={`${selectedValue == 2 ? selected : unselected} ${moveUp}`}>
                2
              </button>
              <button onClick={() => setSelectedValue(3)} className={`${selectedValue == 3 ? selected : unselected} ${moveUp}`}>
                3
              </button>
              <button onClick={() => setSelectedValue(4)} className={`${selectedValue == 4 ? selected : unselected} ${moveUp}`}>
                4
              </button>
              <button onClick={() => setSelectedValue(5)} className={`${selectedValue == 5 ? selected : unselected} ${moveUp}`}>
                5
              </button>
              <button onClick={() => setSelectedValue(6)} className={`${selectedValue == 6 ? selected : unselected} ${moveUp}`}>
                6
              </button>
              <button onClick={() => setSelectedValue(7)} className={`${selectedValue == 7 ? selected : unselected} ${moveUp}`}>
                7
              </button>
              <button onClick={() => setSelectedValue(8)} className={`${selectedValue == 8 ? selected : unselected} ${moveUp}`}>
                8
              </button>
              <button onClick={() => setSelectedValue(9)} className={`${selectedValue == 9 ? selected : unselected} ${moveUp}`}>
                9
              </button>
              <button onClick={() => setSelectedValue(10)} className={`${selectedValue == 10 ? selected : unselected} ${moveUp}`}>
                10
              </button>
              <button onClick={() => setSelectedValue(11)} className={`${selectedValue == 11 ? selected : unselected} ${moveUp}`}>
                J
              </button>
              <button onClick={() => setSelectedValue(12)} className={`${selectedValue == 12 ? selected : unselected} ${moveUp}`}>
                Q
              </button>
              <button onClick={() => setSelectedValue(13)} className={`${selectedValue == 13 ? selected : unselected} ${moveUp}`}>
                K
              </button>
            </div>
          </div>
          {warning ? <div className={"text-red-600 text-xs pt-2"}>Select a Suit and Value</div> : null}
        </div>
        <button
          onClick={onSelect}
          className={"text-2xl text-black font-bold hover:bg-green-600 " +
            "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
        >
          Select
        </button>
      </motion.div>
    </Modal>
  );
};

export default CardSelect;