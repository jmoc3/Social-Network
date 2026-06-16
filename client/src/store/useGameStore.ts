import { create } from 'zustand'

type State = {
  status: "still" | "playing" | "finished" | "starting" | "waiting",
  clock: number[],
  startTime: number,
  canvasProportion: number[],
  gridProportion: number,
  gridEdge: number,
  grid: number[][],
  lastPotentialMovements: ('top'| 'right'| 'bottom'| 'left')[],
  opsMovements: Record<string, string>,
  invalidSteps: Set<string>,
  movementHistory: string[],
  targetPoint: number[],
  mainPath: number[][],
}

type Actions = {
  setStatus: (status: State["status"]) => void,
  setStartTime: (time: number) => void,
  alterClock: (clock: number[]) => void,
  resetClock: () => void,
  pushStep: (step: number[]) => void,
  pushInvalidSteps: (movement: string) => void,
  clearInvalidSteps: () => void,
  validMovement: (position: number[], direction: string) =>  (number[] | boolean)[],
  pushDirection: (movement: string)=>void
  printBlock: (context: CanvasRenderingContext2D, vector?: number[], color?: string, mode?: "easy" | "normal") => void,
  alterGrid: (position: number[], value: number) => void,
  init: () => void,
  findPath: (context: CanvasRenderingContext2D) => void,
  setChosenClosePoint: () => string,
  setLastPotentialMovement: () => State["lastPotentialMovements"],
  alterMainPath: (mainPath: number[][]) => void,
  targetReached: (step: number[]) => boolean,
}

export const useGameStore = create<State & Actions>() ((set, get) => ({
  status: "still",
  clock: [0,0],
  startTime: 3,
  canvasProportion: [800,800],
  gridProportion: 80,
  gridEdge: 0,
  grid: [[]],
  lastPotentialMovements: ['top', 'right', 'bottom', 'left'],
  movementHistory: [],
  opsMovements: {
    'top':'bottom',
    'right':'left',
    'bottom':'top',
    'left':'right'
  },
  invalidSteps: new Set(),
  targetPoint : [],
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
  alterMainPath: (mainPath: number[][]) => set({mainPath}),
  pushInvalidSteps: (movement: string) => set((state)=> ({invalidSteps: new Set([...state.invalidSteps, movement])})),
  clearInvalidSteps: () => set({invalidSteps: new Set()}),
  pushDirection: (movement: string) => set((state) => ({movementHistory: [...state.movementHistory, movement]})),
  init: () => {
    const { canvasProportion, gridProportion } = get()
    const gridEdge = (canvasProportion[0]/gridProportion) - 1
    const randomInitialY = Math.floor((Math.random() * 10)) | 1
    const grid = Array.from({length: gridEdge+1}, ()=> Array(gridEdge+1).fill(0))
    grid[0][randomInitialY] = 1
    set({ 
      targetPoint : [gridEdge, Math.floor((Math.random() * 10))],
      mainPath: [[0, randomInitialY]],
      gridEdge,
      grid 
    })
  },
  alterGrid: (position: number[], value: number) => {
    const { grid } = get()
    const [x, y] = position
    const copy = structuredClone(grid)
    copy[x][y] = value
    set({grid: copy})
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
    const { pushDirection, init, setChosenClosePoint, printBlock, pushStep, validMovement, pushInvalidSteps, alterGrid, clearInvalidSteps, alterMainPath, targetReached } = get()
    init()
    const lastPoint = get().mainPath[get().mainPath.length - 1] as number[]
    printBlock(context, lastPoint)
    alterGrid(lastPoint, 1)

    const interval = setInterval(()=>{

      const currentPosition = get().mainPath[get().mainPath.length - 1]
      const movement = setChosenClosePoint()
      const [step, validStep] = validMovement(currentPosition, movement)
      if(validStep){
        pushDirection(movement)
        pushStep(step as number[])
        const color = ["red", "green", "white", "blue", "yellow", "brown"]
        printBlock(context, step as number[], color[Math.floor(Math.random()*6)])
        alterGrid(step as number[], 1)
        const inTarget = targetReached(step as number[])
        if(inTarget){
          alert("Congratulations, you won")
          return clearInterval(interval)
        }
        clearInvalidSteps()
      }else{
        pushInvalidSteps(movement)
        if(get().invalidSteps.size == 4) {
          alterMainPath(get().mainPath.slice(0, Math.floor(get().mainPath.length/2)))
          return clearInterval(interval)
        }
      }
    }, 10)
    
    // for(const [index, x] of get().grid.entries()){
    //   for (const y of x){
    //     console.log([index, y])
    //     if(y == 1) printBlock(context,[index, y] as number[])
    //   }
    // }
  },
  setChosenClosePoint: ()=> {
    const { setLastPotentialMovement } = get()
    const potentialMovement = setLastPotentialMovement()
    const randomPosition = Math.floor(Math.random() * potentialMovement.length)
    const movement = potentialMovement[randomPosition]
    
    return movement
  },
  validMovement: (position: number[], direction: string): (number[] | boolean)[] => {
    const { mainPath, gridEdge } = get()
    let step = [] as number[]
    if(direction == 'top'){
      step = [position[0], position[1] - 1]
    }

    if(direction == 'right'){
      step = [position[0]+1, position[1]]
    }

    if(direction == 'bottom'){
      step = [position[0], position[1] + 1]
    }

    if(direction == 'left'){
      step = [position[0] - 1, position[1]]
    }

    let validMovement = true
    for(const [x, y] of mainPath){
      if(!(step[0] == x && step[1] == y)) continue
      validMovement = false
      break
    }

    if(step[0] < 0 || step[1] < 0) validMovement = false
    if(step[0] > gridEdge || step[1] > gridEdge) validMovement = false

    return [step, validMovement]
  },
  setLastPotentialMovement: () => {
    const { lastPotentialMovements } = get()
    const availableMovementsUpdated  = lastPotentialMovements as State["lastPotentialMovements"]
    return availableMovementsUpdated 
  },
  targetReached: (step: number[]) => {
    const { targetPoint } = get()
    const [x, y] = step 
    if(x == targetPoint[0] && y == targetPoint[1]) return true
    return false
  }
}))