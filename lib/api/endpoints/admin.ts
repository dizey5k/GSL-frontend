import { apiClient } from '../client'
import {
  ClaimStatus,
  AdminRole,
  TicketBulkMode,
  MatchReportStatus,
} from '@/types'
import { API_PATHS } from '../paths'

export const adminApi = {
  // Users
  getUsers: async (params?: { q?: string; limit?: number; page?: number }) => {
    const response = await apiClient.get(API_PATHS.admin.users, { params })
    return response.data
  },

  getUser: async (id: number) => {
    const response = await apiClient.get(API_PATHS.admin.user(id))
    return response.data
  },

  updateUser: async (
    id: number,
    data: {
      is_verified?: boolean
      badge_verified?: boolean
      is_media_verified?: boolean
      is_admin?: boolean
      admin_role?: AdminRole
      is_banned?: boolean
      nick_color?: string
      nick_prefix?: string
      nick_suffix?: string
    },
  ) => {
    const response = await apiClient.patch(API_PATHS.admin.user(id), data)
    return response.data
  },

  banUser: async (id: number, reason: string) => {
    const response = await apiClient.post(API_PATHS.admin.userBan(id), {
      reason,
    })
    return response.data
  },

  unbanUser: async (id: number) => {
    const response = await apiClient.post(API_PATHS.admin.userUnban(id))
    return response.data
  },

  // Claims
  getClaims: async (status?: ClaimStatus) => {
    const params = status ? { status } : {}
    const response = await apiClient.get(API_PATHS.admin.claims, { params })
    return response.data
  },

  updateClaim: async (
    id: number,
    data: { status: ClaimStatus; admin_note?: string },
  ) => {
    const response = await apiClient.patch(API_PATHS.admin.claim(id), data)
    return response.data
  },

  // Families admin
  getFamilies: async () => {
    const response = await apiClient.get(API_PATHS.admin.families)
    return response.data
  },

  updateFamily: async (id: number, data: any) => {
    const response = await apiClient.patch(API_PATHS.admin.family(id), data)
    return response.data
  },

  deleteFamily: async (id: number) => {
    const response = await apiClient.delete(API_PATHS.admin.family(id))
    return response.data
  },

  // Family members
  getFamilyMembers: async (familyId: number) => {
    const response = await apiClient.get(
      API_PATHS.admin.familyMembers(familyId),
    )
    return response.data
  },

  addFamilyMember: async (
    familyId: number,
    data: { user_id: number; role: string; status?: ClaimStatus },
  ) => {
    const response = await apiClient.post(
      API_PATHS.admin.familyMembers(familyId),
      data,
    )
    return response.data
  },

  updateFamilyMember: async (
    familyId: number,
    userId: number,
    data: { action: string },
  ) => {
    const response = await apiClient.patch(
      API_PATHS.admin.familyMember(familyId, userId),
      data,
    )
    return response.data
  },

  // Match reports
  getMatchReports: async (status?: MatchReportStatus) => {
    const params = status ? { status } : {}
    const response = await apiClient.get(API_PATHS.admin.matchReports, {
      params,
    })
    return response.data
  },

  updateMatchReport: async (
    id: number,
    data: { status: MatchReportStatus; admin_note?: string },
  ) => {
    const response = await apiClient.patch(
      API_PATHS.admin.matchReport(id),
      data,
    )
    return response.data
  },

  // Stats / Cache
  refreshStats: async () => {
    const response = await apiClient.post(API_PATHS.admin.statsRefresh)
    return response.data
  },

  // Roulette admin (дополнительные методы, которые не в rouletteApi)
  roulette: {
    getClaims: async (status: ClaimStatus, server?: string) => {
      const params = { status, ...(server && { server }) }
      const response = await apiClient.get(API_PATHS.admin.rouletteClaims, {
        params,
      })
      return response.data?.claims || []
    },
    updateClaim: async (
      id: number,
      data: { status: ClaimStatus; admin_note?: string },
    ) => {
      const response = await apiClient.patch(
        API_PATHS.admin.rouletteClaim(id),
        data,
      )
      return response.data
    },
    getPrizes: async () => {
      const response = await apiClient.get(API_PATHS.admin.roulettePrizes)
      return response.data?.prizes || []
    },
    updatePrize: async (id: number, data: any) => {
      const response = await apiClient.patch(
        API_PATHS.admin.roulettePrize(id),
        data,
      )
      return response.data
    },
    getSettings: async () => {
      const response = await apiClient.get(API_PATHS.admin.rouletteSettings)
      return response.data?.settings || {}
    },
    updateSettings: async (settings: Record<string, string | number>) => {
      const response = await apiClient.patch(
        API_PATHS.admin.rouletteSettings,
        settings,
      )
      return response.data
    },
    getAudit: async (limit: number = 100) => {
      const response = await apiClient.get(API_PATHS.admin.rouletteAudit, {
        params: { limit },
      })
      return response.data?.rows || []
    },
    bulkTickets: async (data: {
      mode: TicketBulkMode
      amount: number
      user_ids?: number[]
    }) => {
      const response = await apiClient.post(
        API_PATHS.admin.rouletteTicketsBulk,
        data,
      )
      return response.data
    },
  },
}
