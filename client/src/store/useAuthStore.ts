import { create } from 'zustand'
import { apiFetch } from '../helpers/fetching'
import type { LoginDTO, RegisterDTO } from '../types'

type Actions = {
  register: (user: RegisterDTO) => Promise<Record<string, boolean>>
  login: (user: LoginDTO) => Promise<Record<string, boolean>>
}

export const useAuthStore = create<Actions>() (() => ({
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