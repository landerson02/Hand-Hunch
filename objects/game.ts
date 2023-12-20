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
    const index = this.boards.length;
    this.boards.push(new BoardType(this.deck.deal(5) as CardType[], index));
    this.guesses.push(new GuessType());
  }


  toJSON() {
    return {
      deck: this.deck.toJSON(),
      boards: this.boards.map(board => board.toJSON()),
      hand: this.hand.toJSON(),
      guesses: this.guesses.map(guess => guess.toJSON()),
    };
  }

  static fromJSON(json: any) {
    let game = new Game();
    game.deck = Deck.fromJSON(json.deck);
    game.boards = json.boards.map(BoardType.fromJSON);
    game.hand = HandType.fromJSON(json.hand);
    game.guesses = json.guesses.map(GuessType.fromJSON);

    return game;
  };
}