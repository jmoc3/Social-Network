import { apiFetch } from "@/helpers/fetching";
import type { UserStatistics } from "@/types";
import { create } from "zustand";

type States = {
  userStatistics: UserStatistics[]
}

type Actions = {
  addStatisticsFront: (statistic: UserStatistics) => void
  addStatisticsBack: (statistic: UserStatistics) => void
  getUserStatistics: (userId: number) => void
}

export const useUserStore = create<States & Actions>()((set, get) => ({
  userStatistics: [],
  addStatisticsFront: (statistic: UserStatistics) => (set({userStatistics: [...get().userStatistics, statistic]})),
  addStatisticsBack: async (statistic: UserStatistics) => {
    const res = await apiFetch("/statistics", "POST", statistic)

    return res
  },
  getUserStatistics: async (userId: number) => {
    const res = await apiFetch(`/statistics/user/${userId}`,"GET")

    const data = await res.json()
    if(!data.statistics) return
    set({userStatistics: [...data.statistics]})    
  }
}))