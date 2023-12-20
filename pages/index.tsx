import React, {useState, useEffect, useRef} from 'react';
import { Game } from "@/objects/game";
import { BoardType, CardType, CardStatus } from "@/objects/types";
import Nav from "@/components/Nav";
import Row from "@/components/Row";
import CardSelect from '@/components/CardSelect';
import GameOver from "@/components/GameOver";
import logo from '@/public/HandHunchLogoCards.png';
import Image from "next/image";
import Help from "@/components/Help";
import ResetGame from "@/components/ResetGame";
import Settings from "@/components/Settings";
import { SettingsObject } from "@/objects/settings";
import Stats from "@/components/Stats";
import { StatsObject } from "@/objects/stats";

export default function Home() {
  const [game, setGame] = useState<Game>(new Game());
  const [boards, setBoards] = useState<BoardType[]>([]);
  // const [guesses, setGuesses] = useState<GuessType[]>([]);
  const [hand, setHand] = useState<CardType[]>([]);
  const [curIteration, setCurIteration] = useState<number>(0);
  const [isWin, setWin] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCardSelectOpen, setIsCardSelectOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>(new CardType());
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [stats, setStats] = useState<StatsObject>(new StatsObject());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings]
    = useState<SettingsObject>(new SettingsObject("bg-green-700", false));
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isStatsSaved, setIsStatsSaved] = useState(false);
  const [isGameSaved, setIsGameSaved] = useState(true);
  const [isSettingsSaved, setIsSettingsSaved] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGame(game);
    setBoards(game.boards);
    // setGuesses(game.guesses);
    setHand(game.hand.cards);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
        if (scrollRef.current) {
          scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight - 560);
        }
    }
  }, [boards]);

  // Load stats
  useEffect(() => {
    const stats = localStorage.getItem('stats');
    if(stats) {
      const parsed = JSON.parse(stats);
      const newStats = new StatsObject();
      Object.assign(newStats, parsed);
      setStats(newStats);
    }
  }, []);

  // Save stats
  useEffect(() => {
    if(isGameOver && !isStatsSaved) {
      localStorage.setItem('stats', JSON.stringify(stats));
      setIsStatsSaved(true);
    }
  }, [isGameOver, stats]);

  // Load settings
  useEffect(() => {
    const settings = localStorage.getItem('settings');
    if(settings) {
      const parsed = JSON.parse(settings);
      const newSettings = new SettingsObject("bg-green-700", false);
      Object.assign(newSettings, parsed);
      setSettings(newSettings);
    }
  }, []);

  // Save settings
  useEffect(() => {
    if(!isSettingsSaved) {
      localStorage.setItem('settings', JSON.stringify(settings));
      setIsSettingsSaved(true);
    }
  }, [settings]);

  // Load current game
  useEffect(() => {
    const game = localStorage.getItem('game');
    if(game) {
      const parsed: Game = Game.fromJSON(JSON.parse(game));
      setGame(parsed);
      setBoards(parsed.boards);
      // setGuesses(parsed.guesses);
      setHand(parsed.hand.cards);
      const isWinJSON = localStorage.getItem('isWin');
      if(isWinJSON) {
        setWin(JSON.parse(isWinJSON));
      }
      const isGameOverJSON = localStorage.getItem('isGameOver');
      if(isGameOverJSON) {
        setIsGameOver(JSON.parse(isGameOverJSON));
      }
      const curIterationJSON = localStorage.getItem('curIteration');
      if(curIterationJSON) {
        setCurIteration(JSON.parse(curIterationJSON));
      }

    }
  }, []);

  // Save current game
  useEffect(() => {
    if(!isGameSaved) {
      localStorage.setItem('game', JSON.stringify(game.toJSON()));
      localStorage.setItem('isWin', JSON.stringify(isWin));
      localStorage.setItem('isGameOver', JSON.stringify(isGameOver));
      localStorage.setItem('curIteration', JSON.stringify(curIteration));
      setIsGameSaved(true);
    }
  }, [game, isGameSaved]);

  const onCardSelect = (index: number) => {
    let guess = game.guesses[curIteration];
    guess.cards[0].status = index == 0 ? CardStatus.Selected: CardStatus.Unselected;
    guess.cards[1].status = index == 1 ? CardStatus.Selected: CardStatus.Unselected;
    guess.selectedCardIndex = index;
    setSelectedCard(guess.cards[index]);
    setGame(game);
    setBoards([...game.boards]);
    // setGuesses([...game.guesses]);
    setIsCardSelectOpen(true);
  }

  const onSetGuess = (suit: number, value: number) => {
    let guess = game.guesses[curIteration];
    guess.cards[guess.selectedCardIndex].suit = suit;
    guess.cards[guess.selectedCardIndex].value = value;
    guess.cards[guess.selectedCardIndex].status = CardStatus.Unselected;
    setGame(game);
    setBoards([...game.boards]);
    // setGuesses([...game.guesses]);
  }

  const onSubmitGuess = () => {
    let guess = game.guesses[curIteration];
    if (guess.cards[0].suit == 0 || guess.cards[0].value == 0 || guess.cards[1].suit == 0 || guess.cards[1].value == 0) {
      return;
    }
    guess.validateGuess(game.hand);
    setGame(game);
    setBoards([...game.boards]);
    // setGuesses([...game.guesses]);
    deal();
    setIsGameSaved(false);
  }

  const closeCardSelect = () => {
    setIsCardSelectOpen(false);
    let guess = game.guesses[curIteration];
    guess.cards[0].status = CardStatus.Unselected;
    guess.cards[1].status = CardStatus.Unselected;
    guess.selectedCardIndex = -1;
    setGame(game);
    setBoards([...game.boards]);
    // setGuesses([...game.guesses]);
  }

  const closeGameOver = () => {
    setIsGameOverOpen(false);
  }

  const openHelp = () => {
    closeAllModals();
    setIsHelpOpen(true);
  }
  const closeHelp = () => {
    setIsHelpOpen(false);
  }

  const openStats = () => {
    closeAllModals();
    setIsStatsOpen(true);
  }
  const closeStats = () => {
    setIsStatsOpen(false);
  }

  const openSettings = () => {
    closeAllModals();
    setIsSettingsOpen(true);
  }
  const closeSettings = () => {
    setIsSettingsOpen(false);
  }
  const applySettings = (settings: SettingsObject) => {
    let newSettings = new SettingsObject(settings.bgColor, settings.lockedIn);
    setSettings(newSettings);
    setIsSettingsSaved(false);
    setIsSettingsOpen(false);
  }

  const updateHandStrength = (handStrength: string) => {
    stats.updateStrongestHand(handStrength);
  }

  const closeReset = () => {
    setIsResetOpen(false);
  }

  const closeAllModals = () => {
    setIsHelpOpen(false);
    setIsStatsOpen(false);
    setIsSettingsOpen(false);
    setIsResetOpen(false);
    setIsGameOverOpen(false);
    setIsCardSelectOpen(false);
  }

  const deal = () => {
    let guess = game.guesses[curIteration];
    if (guess.cards[0].status == CardStatus.Green && guess.cards[1].status == CardStatus.Green) {
      setWin(true);
      setIsGameOverOpen(true);
      setIsGameOver(true);

      const newStats = new StatsObject();
      Object.assign(newStats, stats);
      newStats.updateStats(true, curIteration);
      setStats(newStats);
      return;
    }
    if (curIteration == 5) {
      setWin(false);
      setIsGameOverOpen(true);
      setIsGameOver(true);

      const newStats = new StatsObject();
      Object.assign(newStats, stats);
      newStats.updateStats(false, curIteration);
      setStats(newStats);
      return;
    }
    guess.current = false;
    game.deal();
    if (settings.lockedIn) {
      let curGuess = game.guesses[curIteration + 1];
      if (guess.cards[0].status == CardStatus.Green) {
        curGuess.cards[0].suit = guess.cards[0].suit;
        curGuess.cards[0].value = guess.cards[0].value;
        curGuess.cards[0].status = CardStatus.Green;
      }
      if (guess.cards[1].status == CardStatus.Green) {
        curGuess.cards[1].suit = guess.cards[1].suit;
        curGuess.cards[1].value = guess.cards[1].value;
        curGuess.cards[1].status = CardStatus.Green;
      }
    }
    setGame(game);
    setBoards([...game.boards]);
    // setGuesses([...game.guesses]);
    setCurIteration(curIteration+1);
    // if (scrollRef.current) {
    //   scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    // }
  }

  const resetGame = () => {
    if (!isGameOver) {
      const newStats = new StatsObject();
      Object.assign(newStats, stats);
      newStats.updateStats(false, curIteration);
      setStats(newStats);
      localStorage.setItem('stats', JSON.stringify(newStats));
      setIsStatsSaved(true);
    }
    const newGame = new Game();
    setGame(newGame);
    setBoards([...newGame.boards]);
    // setGuesses([...newGame.guesses]);
    setHand([...newGame.hand.cards]);
    setCurIteration(0);
    setWin(false);
    setIsGameOver(false);
    setIsCardSelectOpen(false);
    setIsGameOverOpen(false);
    setIsGameSaved(false);
  }

  return (
    <div className={`${settings.bgColor} h-screen`}>
      <div className={"absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center align-middle z-0"}>
        <Image src={logo} alt={"Logo"} className={"opacity-40"}/>
      </div>
      <Nav openHelp={openHelp} openStats={openStats} openSettings={openSettings}/>
      <div className={"flex justify-center align-top h-[75%]"}>
        <div className={"w-[80%] h-full"}>
          <div className={"flex justify-between p-1"}>
            <button
                className='z-1 font-extrabold text-2xl bg-green-500 border-2 w-[20%] mt-2 py-2 border-black rounded-md
                  hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => {
                  onSubmitGuess();
                }}>Submit Guess</button>
            <button
                className='z-1 font-extrabold text-2xl bg-red-500 border-2 border-black mt-2 rounded-md w-[20%] py-2
                  hover:scale-105 transition duration-200 ease-in-out'
                onClick={() => {
                  if (!isGameOver) {
                    setIsResetOpen(true);
                  } else {
                    resetGame();
                  }
                }}>Reset Game</button>
          </div>
          <div className='overflow-y-auto h-full mt-3 z-1 no-scrollbar' ref={scrollRef}>
            {boards.map((board, index) => {
              return <Row key={index} board={board} hand={game.hand} guess={game.guesses[index]}
                          onCardClick={onCardSelect} updateHandStrength={updateHandStrength} rowCount={boards.length}/>
            })}
          </div>
        </div>
      </div>

      <ResetGame isOpen={isResetOpen} closeModal={closeReset} resetGame={resetGame}/>
      <Help isOpen={isHelpOpen} closeModal={closeHelp}/>
      <Stats isOpen={isStatsOpen} closeModal={closeStats} stats={stats}/>
      <Settings isOpen={isSettingsOpen} closeModal={closeSettings} applySettings={applySettings} curSettings={settings}/>
      {selectedCard && <CardSelect isOpen={isCardSelectOpen} closeModal={closeCardSelect} setGuess={onSetGuess} selectedCard={selectedCard}/>}
      {hand[0] && hand[1] && <GameOver isOpen={isGameOverOpen} closeModal={closeGameOver} hand={hand} win={isWin}
                                       iteration={curIteration + 1} resetGame={resetGame} openStats={openStats}/>}
      <button onClick={deal} className='absolute bottom-0 right-0'>DEAL</button>
      <button onClick={() => {
        const newStats = new StatsObject();
        // newStats.guessArray = [1, 3, 5, 2, 6, 1];
        // newStats.wins = 18;
        // newStats.losses = 2;
        // newStats.strongestHand = 'Royal Flush';
        // newStats.games = 20;
        // newStats.winPercentage = 0.9;
        // newStats.longestStreak = 10;
        // newStats.currentStreak = 5;
        setStats(newStats);
        localStorage.setItem('stats', JSON.stringify(newStats));
      }} className='absolute bottom-0 left-0'>RESET</button>
    </div>
  )
}
