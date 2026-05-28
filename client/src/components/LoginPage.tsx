import { type FC } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form'
import snIcon from '@/assets/snIcon.png'
import { Input } from "./ui/Input";
import { useAuthStore } from "../store/useAuthStore";
import type { LoginDTO } from "../types";

export const LoginPage : FC = () => {
  const { register: formRegister, handleSubmit} = useForm<LoginDTO>()
  const { login } = useAuthStore()

  const onSubmit : SubmitHandler<LoginDTO> = async (body: LoginDTO) => {
    console.log("form body: ", body)
    const res = await login(body)
    if (res.response){
      alert("Navigating...")
    }
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white grid gap-10 w-fit p-10 rounded-xl shadow relative'>
      <div className='grid gap-2 justify-center items-center'>
        <div className='grid justify-center w-full h-full'>
          <img className='w-25 h-25 rounded-full object-cover object-center' src={snIcon} alt="" />
        </div>
        <div>
          <h2 className='text-xl font-bold text-center'>Bienvenido</h2>
          <span className="text-sm">Inicia sesión para continuar</span> 
        </div>
      </div>

      <div className='grid gap-4'>
        <label className='grid gap-2' htmlFor="email">
          Email
          <Input type='email' autoComplete='off' placeholder='correo@gmail.com' {...formRegister("email", { required: true })}/>
        </label>
        <label className='grid gap-2' htmlFor="password">
          Contraseña
          <Input type='password' autoComplete='off' placeholder='********' {...formRegister("password", { required: true })} />
        </label>
      </div>
      <div className='flex justify-between text-xs gap-6 mb-20'>
        <label className='flex gap-1' htmlFor="recordarme">
          <input type="checkbox" name="recordarme" id="" />
          Recordarme
        </label>
        <span>¿Olvidaste tu contraseña?</span>
      </div>
      <button className='absolute left-[50%] -translate-x-1/2 bottom-10 bg-cyan-800 text-white w-50 px-6 text-center py-2 cursor-pointer hover:w-full transition-all'>Iniciar sesión</button>
    </form>
  )
}