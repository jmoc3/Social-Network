import { create } from 'zustand'

type State = {
  status: "still" | "playing" | "finished" | "starting" | "waiting",
  clock: number[],
  startTime: number,
  canvasProportion: number[],
  gridProportion: number,
  targetPoints: number[][],
  mainPath: number[][],
}

type Actions = {
  setStatus: (status: State["status"]) => void,
  setStartTime: (time: number) => void,
  alterClock: (clock: number[]) => void,
  resetClock: () => void,
  printBlock: (context: CanvasRenderingContext2D, vector?: number[], color?: string, mode?: "easy" | "normal") => void,
  init: () => void,
  findPath: (context: CanvasRenderingContext2D) => void
}

export const useGameStore = create<State & Actions>() ((set, get) => ({
  status: "still",
  clock: [0,0],
  startTime: 3,
  canvasProportion: [800,800],
  gridProportion: 40,
  targetPoints : [],
  mainPath: [],
  setStatus: (status) => {
    set({ status })
  },
  setStartTime: (time) => {
    set({ startTime: time })
  },
  alterClock: (clock: number[]) => set({ clock }),
  resetClock: () => set({ clock: [0,0] }),
  init: () => {
    const { canvasProportion, gridProportion } = get()
    console.log("Canvas proportion: ", canvasProportion[0])
    console.log("Grid proportion: ", gridProportion)
    const yEdge = Math.floor(canvasProportion[0]/gridProportion) - 1
    console.log("Last cube -> ", Math.floor(canvasProportion[0]/gridProportion), yEdge)
    set({ targetPoints : [[Math.floor(Math.random() * 10) | 1,0], [Math.floor(Math.random() * 10) | 1,yEdge]],
      mainPath: []})
  },
  printBlock: (context: CanvasRenderingContext2D, vector: number[] = [1,1], color="white", mode:"easy" | "normal" = "easy") => {
    
    const proportion = mode == "easy" ? 40 : 10
    set({ gridProportion: proportion })
    const y = vector[0] * proportion
    const x = vector[1] * proportion
    context.strokeStyle = color
    context.lineWidth = proportion

    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x+proportion, y)
    context.stroke()
  },
  findPath: (context: CanvasRenderingContext2D) => {
    const { targetPoints, init, printBlock } = get()
    init()
    console.log("Target point", targetPoints)
    printBlock(context, targetPoints[0])
    printBlock(context, targetPoints[1])
  }
}))