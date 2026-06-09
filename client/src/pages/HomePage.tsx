import { Header } from "@/components/layout/Header";
import type { FC } from "react";
import { MainMessageSidebar } from "@/components/layout/MainMessageSidebar";

export const HomePage: FC = () => {
  return (
    <div className="w-full h-screen">  
      <Header></Header>
      <div className="grid grid-cols-4 gap-4 my-6 mx-56">
        <MainMessageSidebar></MainMessageSidebar>
        <div className="bg-yellow-100 w-full col-span-2"></div>
      </div>
    </div>
  )
}