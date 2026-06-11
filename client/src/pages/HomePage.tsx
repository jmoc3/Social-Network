// import { Header } from "@/components/layout/Header";
import type { FC } from "react";
import { MainMessageSidebar } from "@/components/layout/MainMessageSidebar";
import { MazeRoom } from "@/components/layout/MazeRoom";
import { StadisticSidebar } from "@/components/layout/StadisticSidebar";
import { WelcomeModal } from "@/components/layout/WelcomeModal";
import { WelcomeSide } from "@/components/layout/WelcomeSide";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">  
      <WelcomeModal />
      <div className="flex-1 grid grid-cols-4 gap-4 my-6 mx-56">
        <div className="flex flex-col gap-9">
          <WelcomeSide />
          <MainMessageSidebar />
        </div>
        <MazeRoom />
        <StadisticSidebar />
      </div>
    </div>
  )
}