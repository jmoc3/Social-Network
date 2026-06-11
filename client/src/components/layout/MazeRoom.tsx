import { useGameStore } from "@/store/useGameStore"
import { useEffect, useRef, type FC } from "react"

export const MazeRoom : FC = () => {
  const canvaRef  = useRef<HTMLCanvasElement | null>(null)
  const { status, setStatus, alterClock } = useGameStore()
  
  useEffect(()=>{
    if(status == 'playing'){
      const interval = setInterval(()=> {
        let second = useGameStore.getState().clock[0] 
        let miliseconds = useGameStore.getState().clock[1]
        console.log("Current Time: ", second, miliseconds)
        
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
    
    context.fillStyle = '#252525'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (
    <canvas ref={canvaRef} className="rounded w-full h-full col-span-2"></canvas>
  )
}