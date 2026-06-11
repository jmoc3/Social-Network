import { useGameStore } from "@/store/useGameStore";
import type { FC } from "react";
import { FaArrowsRotate } from "react-icons/fa6";

export const StadisticSidebar : FC = () => {
  const { status, setStatus, clock, resetClock } = useGameStore()

  const stopGame = () => {
    if(status != "playing") return
    setStatus("still")
  }

  const resetGame = () => {
    if(status != "still") return
    stopGame()
    resetClock()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-center gap-2 w-fit h-26 bg-white rounded px-6">
        <h2 className="flex items-center gap-4 font-bold">
          Tiempo
          <button onClick={stopGame} className={`text-xs px-2 py-1 rounded ${status != "still" ? 'cursor-pointer bg-red-200 text-red-800 hover:bg-red-900 hover:text-red-100 hover:font-bold duration-100 transition' : 'bg-gray-200 text-gray-800'}`}>End</button>
          <span onClick={resetGame} className={`rounded p-1 ${status == "still" ? 'cursor-pointer bg-blue-200 text-blue-800 hover:bg-blue-900 hover:text-blue-100 hover:font-bold duration-100 transition' : 'bg-gray-200 text-gray-800'}`}><FaArrowsRotate className="text-xs" /></span>
        </h2>
        <div className="w-full flex items-center justify-center select-none">
          <span className="text-2xl opacity-75"> {`${String(clock[0]).padStart(2, '0')}:${String(clock[1]).padStart(2, '0')}`} </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-26 bg-white rounded p-6">
        <h2 className="font-bold">Jugadores en sala</h2>
        <div className="w-full h-full flex items-center justify-center ">
          <span className="text-xs opacity-75"> ... </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full h-26 bg-white rounded p-6">
        <h2 className="font-bold">Estadisticas de la ronda</h2>
        <div className="w-full h-full flex items-center justify-center ">
          <span className="text-xs opacity-75"> ... </span>
        </div>
      </div>
    </div>
  )
}