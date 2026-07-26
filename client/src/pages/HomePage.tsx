// import { Header } from "@/components/layout/Header";
import type { FC } from "react";
import { MainMessageSidebar } from "@/components/layout/MainMessageSidebar";
import { TypeSide } from "@/components/layout/TypeSide";
import { StadisticSidebar } from "@/components/layout/StadisticSidebar";
import { WelcomeModal } from "@/components/layout/WelcomeModal";
import { WelcomeSide } from "@/components/layout/WelcomeSide";
import { PointerIndicator } from "@/components/layout/PointerIndicator";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col w-full h-screen">  
      <WelcomeModal />
      <div className="flex-1 flex items-center gap-16 my-6 mx-24">
        <div className="flex flex-col gap-9">
          <WelcomeSide />
          <MainMessageSidebar />
          <div className="flex flex-col gap-2 w-full h-26 bg-white rounded p-6">
            <h2 className="font-bold">Jugadores en sala</h2>
            <div className="w-full h-full flex items-center justify-center ">
              <span className="text-xs opacity-75"> ... </span>
            </div>
          </div>
        </div>
        <div className="relative grid w-full h-full justify-center">
          <PointerIndicator />
          <TypeSide />
          <span className="orejarena absolute bottom-10 left-1/2 translate-x-[-50%]">ホセ・オレハレナ</span>
        </div>
        <StadisticSidebar />
      </div>
    </div>
  )
}