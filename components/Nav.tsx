import React from 'react'
import { IoIosHelpCircleOutline, IoIosStats, IoIosSettings } from "react-icons/io";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from "react-icons/bs";
import logo from '@/public/HandHunchLogoTransparent.png';
import Image from "next/image";

type NavProps = {
  openHelp: () => void,
  openSettings: () => void,
}

const Nav = ({ openHelp, openSettings } : NavProps) => {
  return (
    <>
      <nav className='fixed z-40 flex w-full h-[4rem] items-center justify-between py-6 px-[40px] bg-white border-b border-gray-800'>
        <div>
          <ul className='text-black text-w w-full h-full flex flex-row gap-4 items-center justify-center'>
            <a>
              <li className={"text-black hover:-translate-y-1 transition-transform p-[1.5]"}>
                <BsSuitSpadeFill className='h-[30px] w-[30px]' />
              </li>
            </a>
            <a>
              <li className={"text-red-600 hover:-translate-y-1 transition-transform p-[1.5]"}>
                <BsSuitHeartFill className='h-[30px] w-[30px]' />
              </li>
            </a>
            <a>
              <li className={"text-black hover:-translate-y-1 transition-transform p-[1.5]"}>
                <BsSuitClubFill className='h-[30px] w-[30px]' />
              </li>
            </a>
            <a>
              <li className={"text-red-600 hover:-translate-y-1 transition-transform p-[1.5]"}>
                <BsSuitDiamondFill className='h-[30px] w-[30px]' />
              </li>
            </a>
          </ul>
        </div>
        <div className={"flex justify-center"}>
          <a className='flex align-middle justify-center w-[15%] h-[90%]' href=''>
            <Image src={logo} alt={"Logo"} className={"self-center"}/>
          </a>
        </div>
        <div
          className='font-light text-red-900'
          style={{
            fontSize: 'clamp(14px, 5vw, 24px)',
          }}
        >
          <ul className='text-black text-w w-full h-full flex flex-row gap-4 items-center justify-center'>
            <a
              className='group hover:cursor-pointer'
              title='Help'
              aria-label='Help'
              onClick={openHelp}
            >
              <li className='text-black hover:-translate-y-1 transition-transform p-2' >
                <IoIosHelpCircleOutline className='h-[30px] w-[30px]' />
              </li>
            </a>

            <a
              className='group hover:cursor-pointer'
              title='Stats'
              aria-label='Stats'
            >
              <li className='text-black hover:-translate-y-1 transition-transform p-2'>
                <IoIosStats className='h-[30px] w-[30px]' />
              </li>
            </a>

            <a
              className='group hover:cursor-pointer'
              title='Settings'
              aria-label='Settings'
              onClick={openSettings}
            >
              <li className='text-base-text hover:-translate-y-1 transition-transform p-2'>
                <IoIosSettings className='h-[30px] w-[30px]' />
              </li>
            </a>
          </ul>
        </div>
      </nav>
      {/* Spacer */}
      <div className='z-40 w-full h-[4rem] bg-gray-200'></div>
    </>
  )
}
export default Nav