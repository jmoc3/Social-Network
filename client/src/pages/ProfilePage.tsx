import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import type { FC } from "react"
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IndexLineChart } from "@/components/recharts/LineChart";

export const ProfilePage: FC = () => {
  const { user } = useAuthStore()
  const { userStatistics } = useUserStore()

  const chartData = []
  for(const statistic of userStatistics ){
    chartData.push({order: chartData.length + 1, ...statistic} as unknown as Record<string, string | number>)
  }
  
  return (
    <div className="h-[70vh] w-full flex my-6 mx-56">
      {
        user.user_id == "0" ? (
          <div className="w-full flex justify-center items-center">
            <div className="grid gap-4">
              <span>Inicia sesión y desbloquea todo lo que tenemos para ti</span>
              <Link to="/login" className="text-center bg-blue-200 p-2 cursor-pointer text-blue-800 hover:rounded-xl hover:font-bold transition-all duration-200">Login</Link>
            </div>
          </div>
        ) : (
        <>
          <div className="w-[20%] flex flex-col gap-3">
          <div className="w-fit h-fit p-5 rounded bg-[#262626]">
            <FaRegCircleUser className='w-15 h-15 text-white bg-[#262626] rounded object-cover object-center cursor-pointer' />
          </div>
          <div className="grid">
            <span>Orejarena</span>
            <div className="flex gap-2">
              <span>Rank: </span>
              <span className="font-bold">#1</span>
            </div>
            <span className="text-sm opacity-50">email@gmail.com</span>
          </div>
          
          <div className="">
            <h3 className="text-lg font-bold">Mejor ronda</h3>
            <div className="flex flex-col">
              <span>Time: 03:01</span>
              <div className="flex gap-2">
                <span>Points: </span>
                <span className="font-bold">903022</span>
              </div>
              <div className="flex gap-2">
                <span>Quote: </span>
                <span className="font-bold  ">#56</span>
              </div>
              <span>CMP: 22.4</span>
              <span>WMP: 45.2</span>
            </div>
          </div>
        </div>

        <div className="w-[60%]">
          <div className="grid grid-cols-2">
             <div className="grid gap-6">
              <h3 className="text-xl ml-6">Rendimiento Historico</h3>
              <IndexLineChart 
                data={chartData} 
                key="order"
                maxWidth={500}
              />
            </div>
            <div>

            </div>
          </div>

        </div>
        <div className="w-[20%]">
          aaa
        </div>
      </>
      ) 
    }
    </div>
  )
}