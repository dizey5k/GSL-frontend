import { apiClient } from '../client'
import {
  RoulettePrize,
  RouletteSpinResult,
  RouletteRecentWin,
  RouletteStats,
  RouletteSpinType,
  TicketBulkMode,
  ClaimStatus,
} from '@/types'
import { API_PATHS } from '../paths'

export const rouletteApi = {
  getPrizes: async (): Promise<RoulettePrize[]> => {
    const response = await apiClient.get(API_PATHS.roulette.prizes)
    return response.data?.prizes || []
  },

  spin: async (type: RouletteSpinType): Promise<RouletteSpinResult> => {
    const response = await apiClient.post(API_PATHS.roulette.spin, { type })
    return response.data
  },

  getRecentWins: async (limit: number = 20): Promise<RouletteRecentWin[]> => {
    const response = await apiClient.get(API_PATHS.roulette.recent, {
      params: { limit },
    })
    return response.data?.wins || []
  },

  getStats: async (): Promise<RouletteStats> => {
    const response = await apiClient.get(API_PATHS.roulette.stats)
    return response.data
  },

  claimQuest: async (
    key: string,
  ): Promise<{ success: boolean; tickets: number; reward: number }> => {
    const response = await apiClient.post(API_PATHS.roulette.claimQuest, {
      key,
    })
    return response.data
  },

  getQuestStatus: async (): Promise<
    Array<{
      key: string
      title: string
      description: string
      completed: boolean
      claimed: boolean
      reward_tickets: number
    }>
  > => {
    const response = await apiClient.get(API_PATHS.roulette.quests)
    return response.data?.quests || []
  },

  getFeed: async (
    limit: number = 50,
  ): Promise<
    Array<{
      id: number
      name: string
      avatar_url: string
      total_spins: number
      main_server: string | null
      best_prize: string
      best_category: string
      last_date: string
    }>
  > => {
    const response = await apiClient.get(API_PATHS.roulette.feed, {
      params: { limit },
    })
    return response.data?.feed || []
  },

  admin: {
    getClaims: async (status: ClaimStatus, server?: string) => {
      const params = { status, ...(server && { server }) }
      const response = await apiClient.get(API_PATHS.roulette.claims, {
        params,
      })
      return response.data?.claims || []
    },
    updateClaim: async (
      id: number,
      data: { status: ClaimStatus; admin_note?: string },
    ) => {
      const response = await apiClient.patch(
        `${API_PATHS.roulette.claims}/${id}`,
        data,
      )
      return response.data
    },
    getAudit: async (limit: number = 100) => {
      const response = await apiClient.get(API_PATHS.roulette.audit, {
        params: { limit },
      })
      return response.data?.rows || []
    },
    getSettings: async () => {
      const response = await apiClient.get(API_PATHS.roulette.settings)
      return response.data?.settings || {}
    },
    updateSettings: async (settings: Record<string, string | number>) => {
      const response = await apiClient.patch(
        API_PATHS.roulette.settings,
        settings,
      )
      return response.data
    },
    bulkTickets: async (data: {
      mode: TicketBulkMode
      amount: number
      user_ids?: number[]
    }) => {
      const response = await apiClient.post(
        API_PATHS.roulette.bulkTickets,
        data,
      )
      return response.data
    },
  },
}
