import { useGameStore } from "@/store/useGameStore"
import { useEffect, useRef, type FC } from "react"

export const MazeRoom : FC = () => {
  const canvaRef  = useRef<HTMLCanvasElement | null>(null)
  const { grid_bg, status, findPath, setStatus, alterClock } = useGameStore()
  
  useEffect(()=>{
    if(status == 'playing'){
      const interval = setInterval(()=> {
        let second = useGameStore.getState().clock[0] 
        let miliseconds = useGameStore.getState().clock[1]
        
        if(miliseconds == 59){
          second = second + 1
          miliseconds = 0
        }else{
          miliseconds++
        }

        alterClock([second, miliseconds])
        if(second == 30 || useGameStore.getState().status == 'still'){
          clearInterval(interval)
          setStatus("still")
        }
      }, 10)
    }
  }, [status])
  
  useEffect(()=>{
    const canva = canvaRef.current
    if(!canva) return

    const context = canva.getContext('2d')
    if(!context) return
    
    const dpr = window.devicePixelRatio || 1
    const rect = canva.getBoundingClientRect()

    canva.width = rect.width * dpr
    canva.height = rect.height * dpr
    context.scale(dpr, dpr)
    
    context.fillStyle = grid_bg
    context.fillRect(0, 0, 800, 800)
    console.log("Üsing effect y tal")
    findPath(context)

  }, [])

  return (
    <div className={`p-3 bg-[${grid_bg}]`}>
      <canvas ref={canvaRef} className="rounded w-200 h-200 col-span-2" ></canvas>
    </div>
  )
}