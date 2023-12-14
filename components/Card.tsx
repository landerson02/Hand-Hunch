import React from 'react';
import { CardType } from "@/objects/types";
import Image from "next/image";
import backImage from '@/public/cards/back.svg';

const Card = (card: CardType) => {
  let suits = ["spades", "hearts", "clubs", "diamonds"];
  let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

  let imagePath = backImage;
  if (card.value !== 0 && card.suit !== 0) {
    imagePath = require(`@/public/cards/${suits[card.suit - 1]}_${values[card.value - 1]}.svg`).default;
  }

  return (
    <div className='flex justify-center'>
      <Image src={imagePath} alt={imagePath} className={'h-1/2 w-1/2'}/>
    </div>
  );
};

export default Card;
