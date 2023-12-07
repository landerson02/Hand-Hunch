import {CardType, BoardType, GuessType, HandType} from "@/objects/types";
import {Deck} from "@/objects/deck";

export class Game {
  constructor() {
    this.deck = new Deck(true);
    this.hand = new HandType(this.deck.deal(2) as CardType[]);
    this.boards = [];
    this.guesses = [];
    this.deal();
  }
  deck: Deck;
  boards: BoardType[];
  hand: HandType;
  guesses: GuessType[];
  deal() {
    this.boards.push(new BoardType(this.deck.deal(5) as CardType[]));
  }

  guess(guess: GuessType) {
    this.guesses.push(guess);
  }
}