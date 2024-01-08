import React from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

type SignInProps = {
  isOpen: boolean,
  closeModal: () => void,
}

const SignIn: React.FC<SignInProps> = ({ isOpen, closeModal } : SignInProps) => {
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

        <div className='w-[90%] h-[65%]'>
          <form className="flex flex-col space-y-4">
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>

    </Modal>
  );
};

export default SignIn;