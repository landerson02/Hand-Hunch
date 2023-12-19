export class StatsObject {
  games: number;
  wins: number;
  losses: number;
  winPercentage: number;
  currentStreak: number;
  longestStreak: number;
  strongestHand: string;
  guessArray: number[];
  averageGuesses: number;

  constructor() {
    this.games = 0;
    this.wins = 0;
    this.losses = 0;
    this.winPercentage = 0;
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.strongestHand = "High Card";
    this.guessArray = [0, 0, 0, 0, 0, 0];
    this.averageGuesses = 0;
  }

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
    let StrengthMap = new Map<string, number>([
      ["Royal Flush", 9],
      ["Straight Flush", 8],
      ["Four of a Kind", 7],
      ["Full House", 6],
      ["Flush", 5],
      ["Straight", 4],
      ["Three of a Kind", 3],
      ["Two Pair", 2],
      ["Pair", 1],
      ["High Card", 0],
    ]);
    let handStrength = Number(StrengthMap.get(hand));
    let strongestHandStrength = Number(StrengthMap.get(this.strongestHand));
    if (handStrength > strongestHandStrength) {
      this.strongestHand = hand;
    }
  }
}