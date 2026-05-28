import { create } from 'zustand'
import { apiFetch } from '../helpers/fetching'
import type { LoginDTO } from '../types'

type Actions = {
  // register: (user: UserBase) => Promise<boolean>
  login: (user: LoginDTO) => Promise<Record<string, boolean>>
}

export const useAuthStore = create<Actions>() (() => ({
  // register: async (user: UserBase) => {
  //   const res = await apiFetch("/users/register",{
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(user)
  //   })
    
  //   const response = res.json()
  //   console.log(response)
  //   return true
  // },
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