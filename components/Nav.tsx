import React from 'react'
import { IoIosHelpCircleOutline, IoIosStats, IoIosSettings } from "react-icons/io";
import { BsSuitSpade, BsSuitSpadeFill } from "react-icons/bs";

const Nav = () => {
  return (
    <>
      <nav className='fixed z-40 flex w-full h-[4rem] items-center justify-between py-6 px-[40px] bg-gray-200'>
        <div>
          <ul className='text-black text-w w-full h-full flex flex-row gap-4 items-center justify-center'>
            <li>
              <BsSuitSpadeFill className='h-[30px] w-[30px]' />
            </li>
            <li>
              <BsSuitSpade className='h-[30px] w-[30px]' />
            </li>
            <li>
              <BsSuitSpadeFill className='h-[30px] w-[30px]' />
            </li>
          </ul>
        </div>
        <h1 className='self-center font-bold text-black text-3xl'>Hand Hunch</h1>
        <div
          className='font-light text-red-900'
          style={{
            fontSize: 'clamp(14px, 5vw, 24px)',
          }}
        >
          <ul className='text-black text-w w-full h-full flex flex-row gap-4 items-center justify-center'>
            <a
              className='group'
              title='Help'
              aria-label='Help'
              href=''
            >
              <li className='text-black hover:-translate-y-1 transition-transform p-2' >
                <IoIosHelpCircleOutline className='h-[30px] w-[30px]' />
              </li>
            </a>

            <a
              className='group'
              title='Stats'
              aria-label='Stats'
              href=''
            >
              <li className='text-black hover:-translate-y-1 transition-transform p-2'>
                <IoIosStats className='h-[30px] w-[30px]' />
              </li>
            </a>

            <a
              className='group'
              title='Settings'
              aria-label='Settings'
              href=''
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