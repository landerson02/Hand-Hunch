import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";

type CardSelectProps = {
  isOpen: boolean,
  closeModal: () => void,
  setGuess: (suit: number, value: number) => void
}

const CardSelect: React.FC<CardSelectProps> = ({ isOpen, closeModal, setGuess } : CardSelectProps) => {
  const [selectedSuit, setSelectedSuit] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    setSelectedSuit(0);
    setSelectedValue(0);
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
  const unselected = 'border-2 rounded-md border-black border-opacity-0'
  const selected = 'border-2 rounded-md border-black bg-green-300 border-opacity-40'
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Card Select"
      ariaHideApp={false}
    >
      <button onClick={closeModal} className={"absolute top-0 left-0"}><IoIosClose className={"text-red-600 w-12 h-12"}/></button>
      <div className={"flex flex-col items-center justify-between p-2 h-full"}>
        <div className={"text-2xl font-semibold"}>Guess Card</div>
        <div className={"flex flex-col items-center w-full p-6"}>
          <div className={"flex justify-around w-full"}>
            <div className={"grid grid-cols-2 gap-2"}>
              <button onClick={() => setSelectedSuit(1)} className={selectedSuit == 1 ? selected : unselected}>
                <BsSuitSpadeFill className={"w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(2)} className={selectedSuit == 2 ? selected : unselected}>
                <BsSuitHeartFill className={"text-red-600 w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(3)} className={selectedSuit == 3 ? selected : unselected}>
                <BsSuitDiamondFill className={"text-red-600 w-9 h-9"}/>
              </button>
              <button onClick={() => setSelectedSuit(4)} className={selectedSuit == 4 ? selected : unselected}>
                <BsSuitClubFill className={"w-9 h-9"}/>
              </button>
            </div>
            <div className={"grid grid-cols-7 gap-2 text-4xl font-thin"}>
              <button onClick={() => setSelectedValue(1)} className={selectedValue == 1 ? selected : unselected}>
                A
              </button>
              <button onClick={() => setSelectedValue(2)} className={selectedValue == 2 ? selected : unselected}>
                2
              </button>
              <button onClick={() => setSelectedValue(3)} className={selectedValue == 3 ? selected : unselected}>
                3
              </button>
              <button onClick={() => setSelectedValue(4)} className={selectedValue == 4 ? selected : unselected}>
                4
              </button>
              <button onClick={() => setSelectedValue(5)} className={selectedValue == 5 ? selected : unselected}>
                5
              </button>
              <button onClick={() => setSelectedValue(6)} className={selectedValue == 6 ? selected : unselected}>
                6
              </button>
              <button onClick={() => setSelectedValue(7)} className={selectedValue == 7 ? selected : unselected}>
                7
              </button>
              <button onClick={() => setSelectedValue(8)} className={selectedValue == 8 ? selected : unselected}>
                8
              </button>
              <button onClick={() => setSelectedValue(9)} className={selectedValue == 9 ? selected : unselected}>
                9
              </button>
              <button onClick={() => setSelectedValue(10)} className={selectedValue == 10 ? selected : unselected}>
                10
              </button>
              <button onClick={() => setSelectedValue(11)} className={selectedValue == 11 ? selected : unselected}>
                J
              </button>
              <button onClick={() => setSelectedValue(12)} className={selectedValue == 12 ? selected : unselected}>
                Q
              </button>
              <button onClick={() => setSelectedValue(13)} className={selectedValue == 13 ? selected : unselected}>
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
      </div>
    </Modal>
  );
};

export default CardSelect;