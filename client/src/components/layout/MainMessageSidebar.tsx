import type { FC } from "react"

export const MainMessageSidebar: FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full min-h-26 bg-white rounded p-6">
      <h2 className="font-bold">Messages</h2>
      <div className="w-full h-full flex items-center justify-center ">
        <span className="text-xs opacity-75"> Inicia una conversacion para desbloquear los chats</span>
      </div>
    </div>
  )
}