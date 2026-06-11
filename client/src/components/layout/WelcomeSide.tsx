import type { FC } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useGameStore } from "@/store/useGameStore";

export const WelcomeSide : FC = () => {
  const { user } = useAuthStore()
  const { status, setStatus, startTime, setStartTime, resetClock } = useGameStore()

  const mazeLink = () => {
    if(status != 'still') return
    toast.info("📋 Link copied", {position: "top-center", duration: 500})
    // Logic to copy room
  }

  const startGame = () => {
    if(status != "still") return
    resetClock()
    setStatus("starting")
    const intervalo = setInterval(()=>{
      const currenTime = useGameStore.getState().startTime
      setStartTime(currenTime - 1)
      if(currenTime == 1) {
        clearInterval(intervalo)
        setStartTime(3)
        setStatus("playing")
      }
    }, 800)
  }

  return (
    <div className="grid gap-2">
      <span className="text-xl font-bold">Bienvenido <b>{user ? user.name : "?"}</b></span>
      <p>
        You can play alone and beat your PR 
      </p>
      <button onClick={startGame} className={`cursor-pointer rounded py-2 bg-red-200 text-red-800 hover:bg-red-900 hover:text-red-100 hover:font-bold duration-100 transition  ${status == "starting" && "bg-red-900! text-red-100! font-bold!"}`}>
         {status == "starting" ? startTime : status != "still" ? "..." : "Play alone"}
      </button>
      <p>
        or play with friends... Invite them
      </p>
      <button onClick={mazeLink} className={`rounded py-2 ${status == "still" ? 'cursor-pointer bg-blue-200 text-blue-800 hover:bg-blue-900 hover:text-blue-100 hover:font-bold duration-100 transition' : 'bg-gray-200 text-gray-800'}`}>Maze link</button>
    </div>
  )
}