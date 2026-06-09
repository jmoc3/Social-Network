import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, type FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const UnProtectedRouter : FC = () => {
  const { me, user, loading } = useAuthStore()
  useEffect(()=>{
    me()
  },[])
  if (loading) return <span>Cargando ...</span>
  return user ? <Navigate to='/' replace /> : <Outlet/> 
}