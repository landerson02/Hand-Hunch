export class CardType {
  constructor(suit?: number, value?: number, status?: number) {
    this.suit = suit || 0;
    this.value = value || 0;
    this.status = status || 0;
  }
  suit: number;
  value: number;
  status: number;
}

export class BoardType {
  constructor(cards: CardType[]) {
    if (cards.length !== 5) {
      throw new Error('Board must contain exactly 5 cards');
    }
    this.cards = [...cards];
  }
  cards: CardType[] = [];
}

export class GuessType {
  constructor() {
    this.cards.push(new CardType());
    this.cards.push(new CardType());
  }

  setGuess(card: CardType, index: number) {
    this.cards[index] = card;
  }

  validateGuess(hand: HandType) {
    if (this.cards[0].suit == this.cards[1].suit && this.cards[0].value == this.cards[1].value) {
      throw new Error('Guess must contain 2 unique cards');
    }
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].suit == 0 || this.cards[i].value == 0) {
        throw new Error('Guess must contain 2 cards');
      }
    }
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].suit == hand.cards[i].suit && this.cards[0].value == hand.cards[0].value) {
        this.cards[i].status = 3;
      } else if (this.cards[i].suit == hand.cards[i].suit && this.cards[1].value == hand.cards[1].value) {
        this.cards[i].status = 3;
      } else if ((this.cards[i].suit == hand.cards[i].suit) !== (this.cards[0].value == hand.cards[0].value)) {
        this.cards[i].status = 2;
      } else if ((this.cards[i].suit == hand.cards[i].suit) !== (this.cards[1].value == hand.cards[1].value)) {
        this.cards[i].status = 2;
      } else {
        this.cards[i].status = 1;
      }
    }
  }

  cards: CardType[] = [];
}

export class HandType {
  constructor(cards: CardType[]) {
    if (cards.length !== 2) {
      throw new Error('Guess must contain exactly 2 cards');
    }
    this.cards = [...cards];
  }
  cards: CardType[] = [];
}