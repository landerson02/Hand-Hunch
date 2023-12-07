import {CardType} from "@/objects/types";

export class Deck {
  constructor(shuffled?: boolean) {
    this.cards = this.generateDeck();
    if (shuffled) {
      this.shuffle();
    }
    this.length = this.cards.length;
  }
  cards: CardType[] = [];
  length: number;
  generateDeck() {
    let cards: CardType[] = [];
    for (let suit = 1; suit <= 4; suit++) {
      for (let value = 1; value <= 13; value++) {
        cards.push(new CardType(suit, value));
      }
    }
    return cards;
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  deal(numCards: number) : CardType[] | undefined {
    if (numCards > this.cards.length) {
      return undefined;
    }
    this.length -= numCards;
    let cards = [];
    for (let i = 0; i < numCards; i++) {
      cards.push(this.cards.pop());
    }
    // @ts-ignore
    return cards;
  }
}