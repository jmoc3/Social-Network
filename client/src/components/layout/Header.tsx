import type { FC } from "react";
import snIcon from '@/assets/sniconh_negro_sinfondo.png'
import { FaCircleUser } from "react-icons/fa6";
import { FaSistrix } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between px-60 py-6 bg-white">
      <div className="flex gap-8">
        <img className='w-10 h-10 rounded object-cover object-center cursor-pointer' src={snIcon} alt="" onClick={()=> { navigate("/") }} />
        <ul className="flex items-center gap-4">
          <ol className="hover:font-bold cursor-pointer">Inicio</ol>
        </ul>
      </div>
      <div className="flex gap-4 items-center relative">
        <FaSistrix size={15} className="opacity-50 absolute left-2 rounded-full z-0"/>
        <input className="border rounded text-sm px-1 pl-7 py-1 bg-transparent z-10" placeholder="Buscar" type="text" />
        <FaCircleUser size={30} className="hover:scale-110 cursor-pointer transition rounded-full"/>
      </div>
    </div>
  )
}