import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, type FC } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Header } from "@/components/layout/Header"
export const ProtectedRouter : FC = () => {
  const { me, user, loading } = useAuthStore()
  useEffect(()=>{
    me()
  },[])
  if (loading) return <span>Cargando ...</span>
  return user ? (
  <>
    <Header/>
    <Outlet/>
  </>
    ) : <Navigate to='/login' replace />
}