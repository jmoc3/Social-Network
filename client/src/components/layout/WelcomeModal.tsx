import { useState, type FC } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { FaAngleRight } from "react-icons/fa6"

export const WelcomeModal : FC = () => {
  const [display, setDisplay] = useState<boolean>(!localStorage.getItem("user"))
  const [page, setPage] = useState<number>(1)
  const { register, handleSubmit, formState: { errors } } = useForm<{name: string}>()

  const onSubmit: SubmitHandler<{name:string}> = (body: {name: string}) => {
    setDisplay(false)
    localStorage.setItem("user", JSON.stringify(body))
  }

  return (
    <div className={`${!display && "hidden"} flex justify-center items-center w-full h-screen absolute top-0 bg-[rgba(0,0,0,0.28)]`}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 w-125 bg-white rounded p-8">
        <h2 className="text-3xl">Welcome to <span className="font-bold">Mazerooms</span></h2>
        {
          page == 1 && (
          <>
            <span className="text-xl">Race against your friends, conquer challenging mazes, and find out who is the ultimate <span className="font-bold bg-linear-to-r from-blue-800 to-sky-500 bg-clip-text text-transparent">Maze Master</span>!</span>
            <button type="submit" onClick={()=> setPage(page + 1)} className="cursor-pointer p-2 border rounded w-fit translate-x-100">
              <FaAngleRight className="" />
            </button>
          </>
          )
        }
        {
          page == 2 && (
            <div className="grid gap-4">
              <label className="grid gap-2" htmlFor="">
                Enter your nickname
                <input 
                  autoFocus
                  {...register("name", { required: "Nickname required - type something dude 😭" })} 
                  className="border rounded text-xl px-2 py-1 bg-transparent z-10" 
                  placeholder="Buscar" 
                  type="text" 
                />
                {errors.name && <span className="text-sm text-red-400" >{errors.name.message}</span>}
              </label>
              <button type="submit" className="w-full text-xl cursor-pointer py-1 rounded border hover:bg-[#262626] hover:text-white transition" >Play</button>
            </div>
          )
        }
      </form>
    </div>
  )
}