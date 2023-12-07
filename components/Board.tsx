import React from 'react';
import Card from "@/components/Card";
import {BoardType} from "@/objects/types";


const Board = (board: BoardType) => {
  let cards = [];
  for (let i = 0; i < board.cards.length; i++) {
    let card = board.cards[i];
    cards.push(<Card suit = {card.suit} value={card.value} status={card.status}/>)
  }
  return (
    <div style={{width: "50em"}}>
      <div>Board</div>
      <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
        {cards.map((card) => {
          return card;
        })}
      </div>
    </div>
  );
};

export default Board;
