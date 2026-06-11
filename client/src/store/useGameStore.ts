import { create } from 'zustand'

type State = {
  status: "still" | "playing" | "finished" | "starting" | "waiting",
  clock: number[],
  startTime: number,
}

type Actions = {
  setStatus: (status: State["status"]) => void,
  setStartTime: (time: number) => void,
  alterClock: (clock: number[]) => void,
  resetClock: () => void
}

export const useGameStore = create<State & Actions>() ((set) => ({
  status: "still",
  clock: [0,0],
  startTime: 3,
  setStatus: (status) => {
    set({ status })
  },
  setStartTime: (time) => {
    set({ startTime: time })
  },
  alterClock: (clock: number[]) => set({ clock }),
  resetClock: () => set({ clock: [0,0] })
}))