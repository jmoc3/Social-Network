import { create } from 'zustand'
import { apiFetch } from '../helpers/fetching'
import type { LoginDTO, RegisterDTO } from '../types'

type State = {
  user: Record<string,string> | null,
  loading: boolean
}

type Actions = {
  me: () => void
  register: (user: RegisterDTO) => Promise<Record<string, boolean>>
  login: (user: LoginDTO) => Promise<Record<string, string | boolean>>
}

export const useAuthStore = create<State & Actions>() ((set) => ({
  user: null,
  loading: true,
  me: async () => {
    set({ loading: true })
    const token = localStorage.getItem('token')

    if (!token) {
      set({ loading: false })
      return
    }

    try{
      const res = await apiFetch("/users/me",{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      const data = await res.json()

      if (Object.hasOwn(data, "error")){
        set({ user: null })
      }else{
        set({ user: data })
      }
    }catch(error){
      console.error(error)
      set({ user: null })
    }
    set({ loading: false })
  },
  register: async (user) => {
   const res = await apiFetch("/users/register",{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    console.log(res)
    return await res.json()
  },
  login: async (user) => {
    const res = await apiFetch("/users/login",{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    
    return await res.json()
  }

}))