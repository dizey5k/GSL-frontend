import { apiClient } from '../client'
import { API_PATHS } from '../paths'

export const duelApi = {
  getPlayer: async (nick: string, server?: string) => {
    const params = server ? { server } : {}
    const response = await apiClient.get(API_PATHS.duel.player(nick), {
      params,
    })
    return response.data
  },

  getHistory: async (
    nick: string,
    params?: { per_page?: number; page?: number; server?: string },
  ) => {
    const response = await apiClient.get(API_PATHS.duel.history(nick), {
      params,
    })
    return response.data
  },

  getChart: async (
    nick: string,
    params?: { limit?: number; server?: string },
  ) => {
    const response = await apiClient.get(API_PATHS.duel.chart(nick), { params })
    return response.data
  },

  getServers: async (nick: string) => {
    const response = await apiClient.get(API_PATHS.duel.servers(nick))
    return response.data
  },

  getLeaderboard: async (params?: {
    server?: string
    page?: number
    per_page?: number
  }) => {
    const response = await apiClient.get(API_PATHS.duel.leaderboard, { params })
    return response.data
  },

  search: async (query: string) => {
    const response = await apiClient.get(API_PATHS.duel.search, {
      params: { q: query },
    })
    return response.data
  },

  compare: async (nick1: string, nick2: string) => {
    const response = await apiClient.get(API_PATHS.duel.compare, {
      params: { nicks: `${nick1},${nick2}` },
    })
    return response.data
  },
}
