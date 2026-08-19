import { useAuthStore } from "@/store/useAuthStore"
import { type FC } from "react"
import { Outlet } from "react-router-dom"

export const UnProtectedRouter : FC = () => {
  const { loading } = useAuthStore()
  if (loading) return <span>Cargando ...</span>
  return <Outlet/> 
}