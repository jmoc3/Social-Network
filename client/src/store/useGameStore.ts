import { create } from 'zustand'

type State = {
  status: "playing" | "finished",
  clock: number[],
  intervalId: number,
  lineCounter: number,
  wordCounter: number,
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
  setLineCounter: (lineCounter: number) => void,
  setWordCounter: (wordCounter: number) => void,
  setActualHistory: (actualHistory: string) => void,
}

export const useGameStore = create<State & Actions>() ((set, get) => ({
  status: "finished",
  clock: [0,0],
  intervalId:0,
  lineCounter: 0,
  wordCounter: 0,
  actualHistory: '',
  setStatus: (status) => {
    set({ status })
  },
  startGame: () => set({ status: "playing" }),
  stopGame: () => set({ status: "finished" }),
  resetGame: () => {
    const { setLineCounter, setWordCounter, stopGame, stopClock, resetClock, setActualHistory } = get()
    setLineCounter(0)
    setWordCounter(0)
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
  setLineCounter: (lineCounter) => {
    set({ lineCounter })
  },
  setWordCounter: (wordCounter) => {
    set({ wordCounter })
  },
  setActualHistory: (actualHistory) => {
    set({ actualHistory })
  }
}))