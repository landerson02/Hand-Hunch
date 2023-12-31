import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { IoColorFill } from "react-icons/io5";
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import {motion} from "framer-motion";
import {SettingsObject} from "@/objects/settings";
import {SettingsContext} from "@/contexts/SettingsContext";

type SettingsProps = {
  isOpen: boolean,
  closeModal: () => void,
  applySettings: (settings: SettingsObject) => void
  curSettings: SettingsObject
}

const Settings: React.FC<SettingsProps> = ({ isOpen, closeModal, applySettings, curSettings } : SettingsProps) => {
  // const [settings, setSettings]
    // = useState<SettingsObject>(new SettingsObject(curSettings.bgColor, curSettings.lockedIn));
  const settingsContext = useContext(SettingsContext);
  if(!settingsContext) throw new Error("SettingsContext is null");
  const {bgColor, setBgColor, lockedIn, setLockedIn} = settingsContext;
  // useEffect(() => {
  //   setSettings(new SettingsObject(curSettings.bgColor, curSettings.lockedIn));
  // }, [isOpen]);

  const unselected = 'border-2 rounded-md border-black border-opacity-0'
  const selected = 'border-2 rounded-md border-black bg-gray-200 border-opacity-40'
  const hover = 'hover:scale-110 transition duration-200 ease-in-out'

  const customStyles = {
    content: {
      width: '80%', // adjust this value to change the width of the modal
      height: '50%', // adjust this value to change the height of the modal
      maxHeight: '40rem', // overrides the height to make the modal scrollable
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
        <div className={"md:text-4xl text-3xl font-medium"}>Settings</div>
        <div className={"flex flex-col w-full items-center"}>
          <div className={"md:text-xl text-center font-semibold pb-1"}>Background Color</div>
          <div className={"flex flex-row justify-around md:w-[70%] w-[85%]"}>
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-green-700", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-green-700" ? selected : unselected} ${hover} text-green-700`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-red-900", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-red-900" ? selected : unselected} ${hover} text-red-900`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-blue-900", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-blue-900" ? selected : unselected} ${hover} text-blue-900`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-purple-900", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-purple-900" ? selected : unselected} ${hover} text-purple-900`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-pink-300", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-pink-300" ? selected : unselected} ${hover} text-pink-300`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            {/*<button onClick={() => {setSettings(new SettingsObject("bg-gray-900", settings.lockedIn));}}*/}
            {/*        className={`${settings.bgColor == "bg-gray-900" ? selected : unselected} ${hover} text-gray-900`}>*/}
            {/*  <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>*/}
            {/*</button>*/}
            <button onClick={() => {
              setBgColor("bg-green-700");
            }}
                    className={`${bgColor == "bg-green-700" ? selected : unselected} ${hover} text-green-700`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setBgColor("bg-red-900");
            }}
                    className={`${bgColor == "bg-red-900" ? selected : unselected} ${hover} text-red-900`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setBgColor("bg-blue-900");
            }}
                    className={`${bgColor == "bg-blue-900" ? selected : unselected} ${hover} text-blue-900`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setBgColor("bg-purple-900");
            }}
                    className={`${bgColor == "bg-purple-900" ? selected : unselected} ${hover} text-purple-900`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setBgColor("bg-pink-300");
            }}
                    className={`${bgColor == "bg-pink-300" ? selected : unselected} ${hover} text-pink-300`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setBgColor("bg-gray-900");
            }}
                    className={`${bgColor == "bg-gray-900" ? selected : unselected} ${hover} text-gray-900`}>
              <IoColorFill className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
          </div>
          <div className={"text-center pt-1 text-xs"}>Choose the background color of your game</div>
        </div>
        <div className={"flex flex-col w-full items-center"}>
          <div className={"md:text-xl text-center font-semibold pb-1"}>Lock In Correct Guess</div>
          <div className={"flex flex-row justify-around md:w-[30%] w-[40%]"}>
            <button onClick={() => {
              setLockedIn(false);
            }}
                    className={`${!lockedIn ? selected : unselected} ${hover}`}>
              <IoLockOpen className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
            <button onClick={() => {
              setLockedIn(true);
            }}
                    className={`${lockedIn ? selected : unselected} ${hover}`}>
              <IoLockClosed className={"md:w-9 md:h-9 h-7 w-7"}/>
            </button>
          </div>
          <div className={"text-xs text-center pt-1"}>Choose to lock in correct guess on next board</div>
          <div className={"text-xs text-center"}>(You can still change your guess)</div>
        </div>
        <button
          onClick={() => {
            applySettings(new SettingsObject(bgColor, lockedIn));
            closeModal();
          }}
          className={"md:text-2xl text-xl text-black font-bold hover:bg-green-600 " +
            "border-2 border-black rounded-md pl-2 pr-2 pt-1 pb-1 bg-green-500"}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default Settings;