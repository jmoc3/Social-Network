import { Header } from "@/components/layout/Header";
import type { FC } from "react";
import { MainMessageSidebar } from "@/components/layout/MainMessageSidebar";
import { MazeRoom } from "@/components/layout/MazeRoom";
import { StadisticSidebar } from "@/components/layout/StadisticSidebar";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">  
      <div className="flex-1 grid grid-cols-4 gap-4 my-6 mx-56">
        <MainMessageSidebar />
        <MazeRoom />
        <StadisticSidebar />
      </div>
    </div>
  )
}