import { useGameStore } from "@/store/useGameStore";
import type { FC } from "react";
import { FaArrowsRotate } from "react-icons/fa6";

export const StadisticSidebar : FC = () => {
  const { resetGame, clock } = useGameStore()

  return (
    <div className="flex flex-col w-[33%] gap-6">
      <div className="flex flex-col items-center justify-center gap-2 w-fit h-26 bg-white rounded px-6">
        <h2 className="flex items-center gap-4 font-bold">
          Tiempo
          <button tabIndex={1} onClick={resetGame} onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            console.log(e.code)
            if(e.code == 'Space') e.preventDefault()
          } } className='rounded p-1 cursor-pointer bg-blue-200 text-blue-800 hover:bg-blue-900 hover:text-blue-100 hover:font-bold duration-100 transition'><FaArrowsRotate className="text-xs" /></button>
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