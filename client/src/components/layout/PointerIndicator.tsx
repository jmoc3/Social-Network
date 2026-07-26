import { useGameStore } from "@/store/useGameStore"

export const PointerIndicator = () => {
  const { gameData } = useGameStore()
  return (
    <div className="absolute left-1/2 translate-x-[-50%] top-25 grid gap-2 px-12 py-6 border border-b-blue-600 rounded">
      <span className="text-3xl font-bold">Points</span>
      <span className="text-2xl text-center">{gameData.points}</span>
    </div>
  )
}