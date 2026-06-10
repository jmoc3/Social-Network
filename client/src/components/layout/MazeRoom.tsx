import { useEffect, useRef, type FC } from "react"

export const MazeRoom : FC = () => {
  const canvaRef  = useRef<HTMLCanvasElement | null>(null)
  
  useEffect(()=>{
    const canva = canvaRef.current
    if(!canva) return

    const context = canva.getContext('2d')
    if(!context) return
    
    context.fillStyle = '#252525'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (
    <canvas ref={canvaRef} className="w-full h-full col-span-2"></canvas>
  )
}