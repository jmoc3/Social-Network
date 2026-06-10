import type { FC } from "react";

export const StadisticSidebar : FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-fit h-26 bg-white rounded p-6">
        <h2 className="font-bold">Tiempo</h2>
        <div className="w-full h-full flex items-center justify-center ">
          <span className="text-2xl opacity-75"> 30:00 </span>
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