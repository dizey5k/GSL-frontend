import { apiClient } from '../client'
import { PlayerStats, PlayerHistory, PlayerCompareData } from '@/types'
import { API_PATHS } from '../paths'

export const playersApi = {
  get: async (
    nickname: string,
    server?: string,
  ): Promise<PlayerStats | null> => {
    const params = server ? { server } : {}
    const response = await apiClient.get(API_PATHS.players.get(nickname), {
      params,
    })
    return response.data?.data || null
  },

  getHistory: async (
    nickname: string,
    options?: { period?: string; limit?: number; server?: string },
  ): Promise<PlayerHistory> => {
    const params = {
      period: options?.period || '90d',
      limit: options?.limit || 50,
      ...(options?.server ? { server: options.server } : {}),
    }
    const response = await apiClient.get(API_PATHS.players.history(nickname), {
      params,
    })
    return response.data
  },

  getRank: async (nickname: string): Promise<{ rank: number | null }> => {
    const response = await apiClient.get(API_PATHS.players.rank(nickname))
    return response.data
  },

  getRatingHistory: async (
    nickname: string,
    options?: { limit?: number; server?: string },
  ): Promise<{ history: Array<{ rating: number; created_at: string }> }> => {
    const params = {
      limit: options?.limit || 50,
      ...(options?.server ? { server: options.server } : {}),
    }
    const response = await apiClient.get(
      API_PATHS.players.ratingHistory(nickname),
      { params },
    )
    return response.data
  },

  search: async (query: string): Promise<PlayerStats[]> => {
    const response = await apiClient.get(API_PATHS.players.search, {
      params: { q: query },
    })
    return response.data?.data || []
  },

  compare: async (
    player1: string,
    player2: string,
  ): Promise<PlayerCompareData> => {
    const response = await apiClient.get(API_PATHS.players.compare, {
      params: { player1, player2 },
    })
    return response.data?.data
  },
}
