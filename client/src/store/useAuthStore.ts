import { create } from 'zustand'
import { apiFetch } from '../helpers/fetching'
import type { LoginDTO, RegisterDTO } from '../types'

const DEFAULT_USER = {
  user_id: "0",
  name: ""
}

type State = {
  user: Record<string,string>,
  loading: boolean
}

type Actions = {
  setUser: (user: {name:string} | LoginDTO) => void,
  me: () => void
  register: (user: RegisterDTO) => Promise<Record<string, boolean>>
  login: (user: LoginDTO) => Promise<Record<string, string | boolean>>
}

export const useAuthStore = create<State & Actions>() ((set) => ({
  user: DEFAULT_USER,
  loading: false,
  setUser: (user: {name:string} | LoginDTO) => set({ user }),
  me: async () => {
    set({ loading: true })
    try{
      const res = await apiFetch("/users/me","GET")
      const data = await res.json()
      if (!data.status){
        set({ user: DEFAULT_USER })
      }else{
        set({ user: data })
      }
    }catch(error){
      console.error(error)
      set({ user: DEFAULT_USER })
    }
    set({ loading: false })
  },
  register: async (user) => {
   const res = await apiFetch("/register","POST", user)
    return await res.json()
  },
  login: async (user) => {
    const res = await apiFetch("/login","POST", user)
    
    return await res.json()
  }

}))