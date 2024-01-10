import React, {useContext, useEffect, useState} from 'react';
import Modal from 'react-modal';
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import { SettingsContext } from "@/contexts/SettingsContext";
import { signIn } from '@/lib/userService'
import {UserContext} from "@/contexts/userContext";

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

  const baseUserData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(baseUserData);
  const [isWrongUsername, setIsWrongUsername] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);

  const userContext = useContext(UserContext);
  const { setIsLoggedIn, setUsername, setPassword, setUserStats } = userContext;

  const handleChange = (e: { target: { value: string; name: string; }; }) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const data = await signIn(username, password);
      if(data.message === 'Incorrect password') {
        setIsWrongUsername(false);
        setIsWrongPassword(true);
        return;
      } else if(data.message === 'Username not found') {
        setIsWrongPassword(false);
        setIsWrongUsername(true);
        return;
      }
      setIsWrongPassword(false);
      setIsWrongUsername(false);
      const user = data.user;
      console.log('data', data)
      if(!user) {
        // console.log('incorrect username or password');
        return;
      }
      if(user) {
        setIsLoggedIn(true);
        setUsername(username);
        setPassword(password);
        setUserStats(user.userStats);

        closeModal();
      } else {
        console.error("Failed to sign in");
      }
    } catch (e) {
      console.error(e);
    }
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
        <div className='font-medium md:text-4xl text-3xl'>Sign In</div>

        <div className='w-[90%] h-[81%]'>
          <form className="flex flex-col space-y-4" method={"post"} onSubmit={handleSignIn}>
            <label htmlFor="username" className="text-lg font-medium">
              Username {isWrongUsername && <span className={"text-red-600"}>does not exist.</span>} {}
            </label>
            {bgColor === 'bg-red-900' && <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              onChange={handleChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800`}
            />}
            {bgColor === 'bg-blue-900' && <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              onChange={handleChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800`}
            />}
          {bgColor === 'bg-green-700' && <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            onChange={handleChange}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600`}
          />}
          {bgColor === 'bg-purple-900' && <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            onChange={handleChange}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-800 focus:border-purple-800`}
          />}
          {bgColor === 'bg-pink-300' && <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            onChange={handleChange}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-200 focus:border-pink-200`}
          />}
          {bgColor === 'bg-gray-900' && <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            onChange={handleChange}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800`}
          />}
            {/*<input*/}
            {/*  id="username"*/}
            {/*  name="username"*/}
            {/*  type="text"*/}
            {/*  autoComplete="username"*/}
            {/*  required*/}
            {/*  onChange={handleChange}*/}
            {/*  className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-${lighterBgColor} focus:border-${lighterBgColor}`}*/}
            {/*/>*/}
            <label htmlFor="password" className="text-lg font-medium">
              Password {isWrongPassword && <span className={"text-red-600"}>is incorrect.</span>}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={handleChange}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-${lighterBgColor} focus:border-${lighterBgColor}`}
            />
            {bgColor==='bg-red-900' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-800`} >Sign In</button>}
            {bgColor==='bg-green-700' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600`} >Sign In</button>}
            {bgColor==='bg-blue-900' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-blue-800 focus:outline-none focus:bg-blue-800`} >Sign In</button>}
            {bgColor==='bg-purple-900' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-800`} >Sign In</button>}
            {bgColor==='bg-gray-900' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800`} >Sign In</button>}
            {bgColor==='bg-pink-300' && <button type="submit" className={`px-4 py-2 text-lg font-medium text-white ${bgColor} rounded-md hover:bg-pink-200 focus:outline-none focus:bg-pink-200`} >Sign In</button>}

          </form>
          <div className={"flex flex-row justify-center items-center gap-1"}>
            <div className={"text-lg font-medium"}>Don&apos;t have an account?</div>
            <button onClick={openSignUp} className={'ml-2 text-blue-500 hover:underline'}>Sign Up</button>
          </div>
        </div>
      </motion.div>

    </Modal>
  );
};

export default SignIn;