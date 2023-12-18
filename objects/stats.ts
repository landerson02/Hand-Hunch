export class StatsObject {
  constructor() {
    this.games = 0;
    this.wins = 0;
    this.losses = 0;
    this.winPercentage = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.strongestHand = "N/A";
    this.guessArray = [0, 0, 0, 0, 0, 0];
    this.averageGuesses = 0;
  }

  games: number;
  wins: number;
  losses: number;
  winPercentage: number;
  currentStreak: number;
  longestStreak: number;
  strongestHand: string;
  guessArray: number[];
  averageGuesses: number;

  updateStats(win: boolean, guess: number) {
    this.games++;
    if (win) {
      this.wins++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
      this.guessArray[guess]++;
      this.averageGuesses = (this.guessArray[0] + this.guessArray[1] * 2 + this.guessArray[2] * 3
        + this.guessArray[3] * 4 + this.guessArray[4] * 5 + this.guessArray[5] * 6)/this.wins;
    } else {
      this.losses++;
      this.currentStreak = 0;
    }
    this.winPercentage = this.wins / this.games;
  }

  updateStrongestHand(hand: string) {
    if (hand == "Royal Flush") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Straight Flush" && this.strongestHand != "Royal Flush") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Four of a Kind" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Full House" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Flush" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Straight" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House"
      && this.strongestHand != "Flush") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Three of a Kind" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House"
      && this.strongestHand != "Flush" && this.strongestHand != "Straight") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Two Pair" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House"
      && this.strongestHand != "Flush" && this.strongestHand != "Straight" && this.strongestHand != "Three of a Kind") {
      this.strongestHand = hand;
      return;
    }
    else if (hand == "Pair" && this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
      && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House"
      && this.strongestHand != "Flush" && this.strongestHand != "Straight" && this.strongestHand != "Three of a Kind"
      && this.strongestHand != "Two Pair") {
      this.strongestHand = hand;
      return;
    }
    else if (this.strongestHand != "Royal Flush" && this.strongestHand != "Straight Flush"
    && this.strongestHand != "Four of a Kind" && this.strongestHand != "Full House"
    && this.strongestHand != "Flush" && this.strongestHand != "Straight" && this.strongestHand != "Three of a Kind"
    && this.strongestHand != "Two Pair" && this.strongestHand != "Pair") {
      this.strongestHand = hand;
      return;
    }
  }
}