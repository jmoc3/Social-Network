import type { FC } from "react";
import snIcon from '@/assets/sniconh_negro_sinfondo.png'
import { FaSistrix } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="absolute top-0 w-full flex justify-between px-24 py-6 ">
      <div className="flex gap-8">
        <img className='w-10 h-10 rounded object-cover object-center cursor-pointer' src={snIcon} alt="" onClick={()=> { navigate("/") }} />
        <ul className="flex items-center gap-4">
          <Link className="hover:font-bold cursor-pointer" to="/">Inicio</Link>
          <Link className="hover:font-bold cursor-pointer" to='/profile'>Perfil</Link>
        </ul>
      </div>
      <div className="flex gap-4 items-center relative w-[21%]">
        <FaSistrix size={15} className="opacity-75 absolute left-2 rounded-full z-0"/>
        <input className="w-full border rounded text-sm px-1 pl-7 py-1 bg-transparent z-10" placeholder="Buscar perfil" type="text" />
      </div>
    </div>
  )
}