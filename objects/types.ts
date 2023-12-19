export enum CardStatus {
  Unselected,
  Selected,
  Red,
  Yellow,
  Green
}

export class CardType {
  constructor(suit?: number, value?: number) {
    this.suit = suit || 0;
    this.value = value || 0;
    this.status = CardStatus.Unselected;
  }
  suit: number;
  value: number;
  status: CardStatus;

  toJSON() {
    return {
      suit: this.suit,
      value: this.value,
      status: this.status
    };
  }

  static fromJSON(json: any) {
    let card = new CardType();
    card.suit = json.suit;
    card.value = json.value;
    card.status = json.status;

    return card;
  }
}

export class BoardType {
  constructor(cards: CardType[]) {
    if (cards.length !== 5) {
      throw new Error('Board must contain exactly 5 cards');
    }
    this.cards = [...cards];
  }
  cards: CardType[] = [];

  toJSON() {
    return {
      cards: this.cards.map(card => card.toJSON())
    };
  }

  static fromJSON(json: any) {
    return new BoardType(json.cards.map(CardType.fromJSON));
  }
}

export class GuessType {
  constructor() {
    this.cards.push(new CardType());
    this.cards.push(new CardType());
    this.selectedCardIndex = -1;
    this.current = true;
  }

  cards: CardType[] = [];
  selectedCardIndex: number;
  current: boolean;

  validateGuess(hand: HandType) {
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      if (
        card.suit == hand.cards[0].suit && card.value == hand.cards[0].value ||
        card.suit == hand.cards[1].suit && card.value == hand.cards[1].value
      ) {
        card.status = CardStatus.Green;
        continue;
      }
      if (
        card.suit == hand.cards[0].suit || card.value == hand.cards[0].value ||
        card.suit == hand.cards[1].suit || card.value == hand.cards[1].value
      ) {
        card.status = CardStatus.Yellow;
        continue;
      }
      card.status = CardStatus.Red;
    }
  }

  toJSON() {
    return {
      cards: this.cards.map(card => card.toJSON()),
      selectedCardIndex: this.selectedCardIndex,
      current: this.current
    };
  }

  static fromJSON(json: any) {
    let guess = new GuessType();
    guess.cards = json.cards.map(CardType.fromJSON);
    guess.selectedCardIndex = json.selectedCardIndex;
    guess.current = json.current;

    return guess;
  }
}

export class HandType {
  constructor(cards: CardType[]) {
    if (cards.length !== 2) {
      throw new Error('Guess must contain exactly 2 cards');
    }
    this.cards = [...cards];
  }
  cards: CardType[] = [];

  toJSON() {
    return {
      cards: this.cards.map(card => card.toJSON())
    };
  }

  static fromJSON(json: any) {
    return new HandType(json.cards.map(CardType.fromJSON));
  }
}