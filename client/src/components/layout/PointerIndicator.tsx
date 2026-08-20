import { useGameStore } from "@/store/useGameStore"

export const PointerIndicator = () => {
  const {  goodLetters, badLetters, gameData, currentStreak } = useGameStore()
  return (
    <div className="absolute left-1/2 translate-x-[-50%] top-25 space-y-4">
      <div className="grid gap-2 px-10 py-4 border border-b-blue-600 rounded">
        <span className="text-2xl font-bold">Puntos</span>
        <span className="text-xl text-center">{gameData.points}</span>
      </div>
      <div>
        <div className="flex gap-2">
          <span className="">Racha actual: </span>
          <span className={`text-blue-800`} >x{currentStreak}</span>
        </div>
        <div className="flex gap-2">
          <span className="">Palabras mal escritas: </span>
          <span className={`text-red-800`} >{badLetters.size}</span>
        </div>
        <div className="flex gap-2">
          <span className="">Precision: </span>
          <span className={`text-red-800`} >{goodLetters.length == 0 && badLetters.size == 0 ? 100 : Math.round(goodLetters.length / (badLetters.size + goodLetters.length) * 100)}%</span>
        </div>
      </div>
    </div>

  )
}