import React, {useContext, useEffect} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import { SettingsContext } from "@/contexts/SettingsContext";

type SignInProps = {
  isOpen: boolean,
  closeModal: () => void,
  openSignUp: () => void,
}

const SignIn: React.FC<SignInProps> = ({ isOpen, closeModal, openSignUp } : SignInProps) => {
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
    },
    overlay: {
      backgroundColor: 'transparent', // make the background transparent
    },
  };
  const settingsContext = useContext(SettingsContext);
  if(!settingsContext) throw new Error("SettingsContext is null");
  const { bgColor } = settingsContext;
  const [lighterBgColor, setLighterBgColor] = React.useState<string>('');
  useEffect(() => {
    // const base = bgColor.substring(3, bgColor.length - 4);
    // const tint = parseInt(bgColor.substring(bgColor.length - 3));
    // const newLighterBgColor = `${base}-${tint - 100}`;
    // console.log(newLighterBgColor);
    if (bgColor === 'bg-red-900') {
      setLighterBgColor('red-800');
    } else if (bgColor === 'bg-green-700') {
      setLighterBgColor('green-600');
    } else if (bgColor === 'bg-blue-900') {
      setLighterBgColor('blue-800');
    } else if (bgColor === 'bg-purple-900') {
      setLighterBgColor('purple-800');
    } else if (bgColor === 'bg-pink-300') {
      setLighterBgColor('pink-200');
    } else if (bgColor === 'bg-gray-900') {
      setLighterBgColor('gray-800');
    } else {
      throw new Error("bgColor is not a valid color");
    }
  }, [bgColor]);


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
        <div className='font-medium md:text-4xl text-3xl'>Sign In</div>

        <div className='w-[90%] h-[81%]'>
          <form className="flex flex-col space-y-4">
            <label htmlFor="username" className="text-lg font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-${lighterBgColor} focus:border-${lighterBgColor}`}
            />
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-${lighterBgColor} focus:border-${lighterBgColor}`}
            />
            <button
              type="submit"
              className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-${lighterBgColor} focus:outline-none focus:bg-${lighterBgColor}`}
            >
              Sign In
            </button>
          </form>
          <div className={"flex flex-row justify-center items-center gap-1"}>
            <div className={"text-lg font-medium"}>Don't have an account?</div>
            <button onClick={openSignUp} className={'ml-2 text-blue-500 hover:underline'}>Sign Up</button>
          </div>
        </div>
      </motion.div>

    </Modal>
  );
};

export default SignIn;