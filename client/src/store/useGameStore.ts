import { create } from 'zustand'

type State = {
  status: "still" | "playing" | "finished" | "starting" | "waiting",
  clock: number[],
  startTime: number,
  canvasProportion: number[],
  gridProportion: number,
  gridEdge: number,
  movementHistory: string[],
  targetPoints: number[],
  mainPath: number[][],
}

type Actions = {
  setStatus: (status: State["status"]) => void,
  setStartTime: (time: number) => void,
  alterClock: (clock: number[]) => void,
  resetClock: () => void,
  pushStep: (step: number[]) => void,
  validStep: (step: number[]) => boolean,
  pushDirection: (movement: string)=>void
  printBlock: (context: CanvasRenderingContext2D, vector?: number[], color?: string, mode?: "easy" | "normal") => void,
  init: () => void,
  findPath: (context: CanvasRenderingContext2D) => void,
  setChosenClosePoint: ()=>boolean,
  setDirection: ()=>void
}

export const useGameStore = create<State & Actions>() ((set, get) => ({
  status: "still",
  clock: [0,0],
  startTime: 3,
  canvasProportion: [800,800],
  gridProportion: 80,
  gridEdge: 0,
  movementHistory: [],
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
  pushStep: (step: number[])=> set((state)=>({mainPath: [...state.mainPath, step]})),
  pushDirection: (movement: string) => set((state) => ({movementHistory: [...state.movementHistory, movement]})),
  init: () => {
    const { canvasProportion, gridProportion } = get()
    const gridEdge = (canvasProportion[0]/gridProportion)
    set({ 
      targetPoints : [gridEdge - 1, (Math.random() * 10) | 1],
      mainPath: [[0, (Math.random() * 10) | 1]],
      gridEdge
    })
  },
  printBlock: (context: CanvasRenderingContext2D, vector: number[] = [1,1], color="white", mode:"easy" | "normal" = "easy") => {
    const proportion = mode == "easy" ? 80 : 20 
    set({ gridProportion: proportion })
    const x = vector[0] * proportion
    const y = vector[1] * proportion
    context.fillStyle = color
    context.fillRect(x, y, proportion, proportion)
  },
  findPath: (context: CanvasRenderingContext2D) => {
    const { targetPoints, init, setChosenClosePoint, printBlock } = get()
    init()
    console.log("target ", get().targetPoints)
    const [x ,y] = get().mainPath[get().mainPath.length - 1]
    printBlock(context, [x,y])
    setChosenClosePoint()
    // if(res) return clearInterval(interval)
  },
  setChosenClosePoint: ()=> {
    const { setDirection } = get()
    setDirection()
  },
  setDirection:() => {
    const { gridEdge, mainPath, targetPoints, movementHistory, validStep, pushStep, pushDirection, setDirection } = get()
    const lastPosition = mainPath[mainPath.length-1]
    const randomNumber = Math.random()
    let step: number[] = []
    if(randomNumber <= .25 && lastPosition[1] != 0){
      //top
      step = [lastPosition[0], lastPosition[1]-1]
      if (step[0] == targetPoints[0] && step[1] == targetPoints[1]) return true
      // if(!validStep(step)) return setDirection()    
      pushStep(step)
      pushDirection('top')
    }
    
    if(randomNumber <= .50 && lastPosition[0] != gridEdge - 1){
      //right
      step = [lastPosition[0]+1, lastPosition[1]]
      if (step[0] == targetPoints[0] && step[1] == targetPoints[1]) return true
      // if(!validStep(step)) return setDirection()
      pushStep(step)
      pushDirection('right')
    }
    
    if(randomNumber <= .75 && lastPosition[1] != gridEdge - 1){
      //bottom
      step = [lastPosition[0], lastPosition[1]+1]
      if (step[0] == targetPoints[0] && step[1] == targetPoints[1]) return true
      // if(!validStep(step)) return setDirection()
      pushStep(step)
      pushDirection('bottom')
    }

    if(randomNumber <= 1 && lastPosition[0] != 0){
      //left
      step = [lastPosition[0]-1, lastPosition[1]]
      if (step[0] == targetPoints[0] && step[1] == targetPoints[1]) return true
      // if(!validStep(step)) return setDirection()
      pushStep(step)
      pushDirection('left')
    }
    console.log(step, targetPoints)
    if(step[0] == targetPoints[0] && step[1] == targetPoints[1] ) return console.log("GOTHEM")
    // setDirection()
  },
  validStep: (step: number[]) => {
    const { mainPath, targetPoints } = get()
    const [x, y] = step
    const [xTarget, yTarget] = targetPoints
    if(x == xTarget && y == yTarget) return false
    return true
    // for(const [x, y] of mainPath){
    //   if(x==step[0] && y==step[1]) return false
    // }
    // return true
  }
}))