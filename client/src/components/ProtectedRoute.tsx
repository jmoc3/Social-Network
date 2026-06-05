import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, type FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRouter : FC = () => {
  const { me, user, loading } = useAuthStore()
  useEffect(()=>{
    me()
  },[])
  if (loading) return <span>Cargando ...</span>
  // TODO: auto sign in
  return user ? <Outlet/> : <Navigate to='/login' replace />
}