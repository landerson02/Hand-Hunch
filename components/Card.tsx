import React from 'react';
import { CardType, CardStatus } from "@/objects/types";
import Image from "next/image";
import backImage from '@/public/cards/back.svg';

type CardProps = {
  card: CardType;
}

const Card = ({card}: CardProps) => {
  let suits = ["spades", "hearts", "clubs", "diamonds"];
  let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

  let imagePath = backImage;
  if (card.value !== 0 && card.suit !== 0) {
    imagePath = require(`@/public/cards/${suits[card.suit - 1]}_${values[card.value - 1]}.svg`).default;
  }

  return (
    <div className='flex justify-center w-20 border-2 rounded-md border-black'>
      <Image src={imagePath} alt={imagePath} />
    </div>
  );
};

export default Card;
