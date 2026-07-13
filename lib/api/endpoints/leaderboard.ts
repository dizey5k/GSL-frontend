import { apiClient } from '../client'
import {
  LeaderboardPlayersResponse,
  LeaderboardFamiliesResponse,
  LeaderboardCharacter,
  LeaderboardOrderBy,
} from '@/types'
import { API_PATHS } from '../paths'

export const leaderboardApi = {
  getPlayers: async (params?: {
    page?: number
    limit?: number
    server?: string
    order_by?: LeaderboardOrderBy
  }): Promise<LeaderboardPlayersResponse> => {
    const response = await apiClient.get(API_PATHS.leaderboard.players, {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 100,
        ...(params?.server && { server: params.server }),
        order_by: params?.order_by || 'rating',
      },
    })
    return response.data
  },

  getFamilies: async (params?: {
    page?: number
    limit?: number
    server?: string
    order_by?: LeaderboardOrderBy
  }): Promise<LeaderboardFamiliesResponse> => {
    const response = await apiClient.get(API_PATHS.leaderboard.families, {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 100,
        ...(params?.server && { server: params.server }),
        order_by: params?.order_by || 'rating',
      },
    })
    return response.data
  },

  getCharacters: async (params?: {
    page?: number
    limit?: number
    server?: string
  }): Promise<{
    data: LeaderboardCharacter[]
    total: number
    total_pages: number
  }> => {
    const response = await apiClient.get(API_PATHS.leaderboard.characters, {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 100,
        ...(params?.server && { server: params.server }),
      },
    })
    return response.data
  },

  getTop: async (
    type: 'players' | 'families',
    params?: { limit?: number; server?: string },
  ) => {
    const response = await apiClient.get(API_PATHS.leaderboard.top, {
      params: {
        order_by: type === 'players' ? 'rating' : 'win_rate',
        limit: params?.limit || 10,
        ...(params?.server && { server: params.server }),
      },
    })
    return response.data?.data || []
  },
}
