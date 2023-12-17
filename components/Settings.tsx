import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { IoColorFill } from "react-icons/io5";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import {motion} from "framer-motion";
import {SettingsObject} from "@/objects/settings";

type SettingsProps = {
  isOpen: boolean,
  closeModal: () => void,
  applySettings: (settings: SettingsObject) => void
  curSettings: SettingsObject
}

const Settings: React.FC<SettingsProps> = ({ isOpen, closeModal, applySettings, curSettings } : SettingsProps) => {
  const [settings, setSettings]
    = useState<SettingsObject>(new SettingsObject(curSettings.bgColor, curSettings.lockedIn));

  useEffect(() => {
    setSettings(new SettingsObject(curSettings.bgColor, curSettings.lockedIn));
  }, [isOpen]);

  const unselected = 'border-2 rounded-md border-black border-opacity-0'
  const selected = 'border-2 rounded-md border-black bg-gray-200 border-opacity-40'
  const hover = 'hover:scale-110 transition duration-200 ease-in-out'

  const customStyles = {
    content: {
      width: '40%', // adjust this value to change the width of the modal
      height: '50%', // adjust this value to change the height of the modal
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
        <div className={"text-2xl font-semibold"}>Settings</div>
        <div className={"flex flex-col w-full items-center"}>
          <div className={"text-xl text-center font-semibold pb-1"}>Background Color</div>
          <div className={"flex flex-row justify-around w-[70%]"}>
            <button onClick={() => {setSettings(new SettingsObject("bg-green-700", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-green-700" ? selected : unselected} ${hover} text-green-700`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject("bg-red-900", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-red-900" ? selected : unselected} ${hover} text-red-900`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject("bg-blue-900", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-blue-900" ? selected : unselected} ${hover} text-blue-900`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject("bg-purple-900", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-purple-900" ? selected : unselected} ${hover} text-purple-900`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject("bg-pink-300", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-pink-300" ? selected : unselected} ${hover} text-pink-300`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject("bg-gray-900", settings.lockedIn));}}
                    className={`${settings.bgColor == "bg-gray-900" ? selected : unselected} ${hover} text-gray-900`}>
              <IoColorFill className={"w-9 h-9"}/>
            </button>
          </div>
          <div className={"text-center pt-1"}>Choose the background color of your game</div>
        </div>
        <div className={"flex flex-col w-full items-center"}>
          <div className={"text-xl text-center font-semibold pb-1"}>Lock In Correct Guess</div>
          <div className={"flex flex-row justify-around w-[30%]"}>
            <button onClick={() => {setSettings(new SettingsObject(settings.bgColor, false));}}
                    className={`${!settings.lockedIn ? selected : unselected} ${hover}`}>
              <IoLockOpen className={"w-9 h-9"}/>
            </button>
            <button onClick={() => {setSettings(new SettingsObject(settings.bgColor, true));}}
                    className={`${settings.lockedIn ? selected : unselected} ${hover}`}>
              <IoLockClosed className={"w-9 h-9"}/>
            </button>
          </div>
          <div className={"text-center pt-1"}>Choose to lock in a correct guess when the new board is dealt</div>
          <div className={"text-center"}>(You can still change your guess)</div>
        </div>
        <button
          onClick={() => {applySettings(settings); closeModal();}}
          className={"text-2xl text-black font-bold hover:bg-green-600 " +
            "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default Settings;