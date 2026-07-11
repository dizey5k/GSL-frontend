import { apiClient } from '../client'
import { FamilyStats, FamilyHistory, FamilyCompareData } from '@/types'
import { API_PATHS } from '../paths'

export const familiesApi = {
  get: async (name: string): Promise<FamilyStats | null> => {
    const response = await apiClient.get(API_PATHS.families.get(name))
    return response.data?.data || null
  },

  getHistory: async (
    name: string,
    options?: { period?: string; limit?: number },
  ): Promise<FamilyHistory> => {
    const params = {
      period: options?.period || '90d',
      limit: options?.limit || 50,
    }
    const response = await apiClient.get(API_PATHS.families.history(name), {
      params,
    })
    return response.data
  },

  search: async (query: string): Promise<FamilyStats[]> => {
    const response = await apiClient.get(API_PATHS.families.search, {
      params: { q: query },
    })
    return response.data?.data || []
  },

  compare: async (
    family1: string,
    family2: string,
  ): Promise<FamilyCompareData> => {
    const response = await apiClient.get(API_PATHS.families.compare, {
      params: { family1, family2 },
    })
    return response.data?.data
  },

  predict: async (
    family1: string,
    family2: string,
  ): Promise<{ winner: string; confidence: number }> => {
    const response = await apiClient.get(API_PATHS.families.predict, {
      params: { family1, family2 },
    })
    return response.data?.data
  },

  getMap: async (): Promise<Record<string, string>> => {
    const response = await apiClient.get(API_PATHS.families.map)
    return response.data?.map || {}
  },
}
