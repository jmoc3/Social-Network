import type { UserStatistics } from '@/types'
import { create } from 'zustand'

type State = {
  status: "playing" | "finished",
  gameData: {
    points: number
  },
  playerStatistics: UserStatistics[],
  clock: number[],
  intervalId: number,
  lineCounter: number,
  wordCounter: number,
  wordWithPoints: Record<string, number>
  letterCounter: number,
  actualHistory: string,
}

type Actions = {
  setStatus: (status: State["status"]) => void,
  startGame: () => void,
  stopGame: () => void,
  resetGame: () => void,
  startClock: () => void,
  stopClock: () => void,
  resetClock: () => void,
  setGameData: (key:string, value: string | number) => void,
  setLineCounter: (lineCounter: number) => void,
  setWordCounter: (wordCounter: number) => void,
  setLetterCounter: (letterCounter: number) => void,
  setActualHistory: (actualHistory: string) => void,
  addToStatistics: (data: UserStatistics) => void, 
  doCalculation: (sentence: string) => {wpm:number, cpm: number},
}

export const useGameStore = create<State & Actions>() ((set, get) => ({
  status: "finished",
  gameData: {
    points: 0
  },
  playerStatistics:[
    {id: 3, userId: 1, time: '02:34', wpm: 50, cpm: 46, updatedAt: new Date(), createdAt: new Date()},
    {id: 2, userId: 1, time: '02:54', wpm: 45, cpm: 42, updatedAt: new Date(), createdAt: new Date()},
    {id: 1, userId: 1, time: '03:04', wpm: 40, cpm: 36, updatedAt: new Date(), createdAt: new Date()},
  ],
  clock: [0,0],
  intervalId:0,
  lineCounter: 0,
  letterCounter: 0,
  wordCounter: 0,
  wordWithPoints: {},
  actualHistory: '',
  setStatus: (status) => {
    set({ status })
  },
  startGame: () => set({ status: "playing" }),
  stopGame: () => set({ status: "finished" }),
  resetGame: () => {
    const { setLineCounter, setLetterCounter, stopGame, stopClock, resetClock, setActualHistory } = get()
    setLineCounter(0)
    setLetterCounter(0)
    stopGame()
    stopClock()
    resetClock()
    setActualHistory('')
    set({ status: "finished", clock: [0,0] })
  },
  startClock: () => {
    const interval = setInterval(() => {
      const [minutes, seconds] = get().clock
      if(seconds == 59){
        set({ clock: [minutes + 1, 0] })
      }
      else{
        set({ clock: [minutes, seconds + 1] })
      }   
      if(get().status != 'playing'){
        clearInterval(get().intervalId)
        set({ intervalId: 0 })
      }
    }, 100)

    set({ intervalId: interval })
  },
  stopClock: () => {
    const interval = get().intervalId
    if(interval != 0){
      clearInterval(interval)
      set({ intervalId: 0 })
    }
  },
  resetClock: () => {
    set({ clock: [0,0] })
  },
  setGameData: (key: string, value: string | number) => {
    set({
      gameData: {
        ...get().gameData,
        [key]: value
      }
    })
  },
  setLineCounter: (lineCounter) => {
    set({ lineCounter })
  },
  setWordCounter: (wordCounter) => {
    set({ wordCounter })
  },
  setLetterCounter: (letterCounter) => {
    set({ letterCounter })
  },
  setActualHistory: (actualHistory) => {
    set({ actualHistory })
  },
  addToStatistics: (data: UserStatistics) => {
    set({ playerStatistics: [data, ...get().playerStatistics] })
  },
  doCalculation: (sentence: string) : {wpm: number, cpm: number} => {
    const { clock } = get()

    const minutesPlayed = clock[0] + clock[1] / 60
    const cpm = +(sentence.length / minutesPlayed).toFixed(2)
    const wpm = +((sentence.length/5) / minutesPlayed).toFixed(2)

    return { wpm, cpm }
  },
}))