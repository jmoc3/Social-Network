import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, type FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/components/layout/Header"
export const ProtectedRouter : FC = () => {
  const { loading, me } = useAuthStore()
  useEffect(()=>{
    me()
  },[])

  if (loading) return <span>Cargando ...</span>
  return (
  <>
    <Header/>
    <Outlet/>
  </>
    )
}