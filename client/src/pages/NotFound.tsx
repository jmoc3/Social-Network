import type { FC } from "react";
import { Link } from "react-router-dom";

export const NotFoundPage : FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid gap-4 text-center">
      <img className="rounded-xl" src="https://i.pinimg.com/736x/c5/21/64/c52164749f7460c1ededf8992cd9a6ec.jpg" alt="" />
      <Link to='/login' className="hover:font-black">Please return to home</Link>
      </div>
    </div>
  )
}