import React from 'react';
import Modal from 'react-modal';
import {IoIosClose} from "react-icons/io";

type HelpProps = {
  isOpen: boolean,
  closeModal: () => void,
}

const CardSelect: React.FC<HelpProps> = ({ isOpen, closeModal } : HelpProps) => {
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
      contentLabel="Help"
      ariaHideApp={false}
    >
      <button onClick={closeModal} className={"absolute top-0 left-0"}><IoIosClose className={"text-red-600 w-12 h-12"}/></button>
      <div className={"flex flex-col items-center justify-between p-2 h-full"}>
        <div className={"text-2xl font-semibold"}>Help</div>
        <div className={"flex-col w-full h-[75%] overflow-y-scroll"}>
          <div className={"text-xl font-semibold text-center"}>Welcome to Hand Hunch!</div>
          <div className={"text-xl"}>Hand Hunch is a poker-inspired game where your goal is to guess the
            mystery Texas Hold'em hand consisting of two cards, based on the available information. Are you ready to
            showcase your poker skills and deduction prowess?</div>
          <br></br>
          <div className={"text-xl font-semibold text-center"}>How to Play</div>
          <div className={"text-xl"}>
            <div className={"font-semibold inline"}>
              1. Making Guesses:
            </div> Click on one each of the face-down cards to show the popup, and then select the card you believe
            matches one of the cards in the mystery hand. Each guess is crucial, so choose wisely, based on the given
            board and hand strength!
          </div>
          <br></br>
          <div className={"text-xl"}>
            <div className={"font-semibold inline"}>
              2. Assessing Guesses:
            </div> Once you've submitted your guess, the game provides feedback:
            <ul className={"list-disc list-inside pl-10"}>
              <li className={"text-xl"}>
                <div className={"font-semibold inline text-green-800"}>
                  Green:
                </div> When your chosen card matches both the suit and value of one of the
                actual mystery cards, it turns green.</li>
              <li className={"text-xl"}>
                <div className={"font-semibold inline text-yellow-500"}>
                Yellow:
              </div> If your selected card matches either the suit or value of a
                mystery card, it turns yellow.</li>
              <li className={"text-xl"}>
                <div className={"font-semibold inline text-red-600"}>
                Red:
              </div> If the card you guessed doesn't match either the suit or value of
                one of the mystery cards, it will turn red.</li>
            </ul>
          </div>
          <br></br>
          <div className={"text-xl"}>
            <div className={"font-semibold inline"}>
              3. Winning the game:
            </div> Use your deduction skills to guess the mystery hand before exhausting 6 attempts.
            The game rewards precise guesses and strategic thinking. Are you up for the challenge?
          </div>
          <br></br>
          <div className={"text-xl font-semibold text-center"}>
            Enjoy Hand Hunch and Good Luck!
          </div>
        </div>
        <div className={"flex justify-center w-full p-2"}>
          <button
            onClick={closeModal}
            className={"text-2xl text-black font-bold hover:bg-red-500 " +
              "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-red-400"}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CardSelect;