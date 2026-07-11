import { apiClient } from '../client'
import { User, ClaimStatus } from '@/types'
import { API_PATHS } from '../paths'

export const authApi = {
  me: async (): Promise<{ user: User | null }> => {
    const response = await apiClient.get(API_PATHS.auth.me)
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_PATHS.auth.logout)
  },

  getClaimStatus: async (): Promise<ClaimStatus | null> => {
    const response = await apiClient.get(API_PATHS.auth.claimStatus)
    return response.data
  },

  submitClaim: async (data: {
    player_nickname: string
    proof: string
    source: 'capt' | 'gangame' | 'both'
    server_id: string
  }): Promise<{
    success: boolean
    not_in_rating?: boolean
    missing_modes?: string[]
  }> => {
    const response = await apiClient.post(API_PATHS.auth.submitClaim, data)
    return response.data
  },

  tfaStatus: async (): Promise<{
    enabled: boolean
    linked: boolean
    bot_configured: boolean
  }> => {
    const response = await apiClient.get(API_PATHS.auth.tfaStatus)
    return response.data
  },

  tfaLink: async (): Promise<{ deeplink: string }> => {
    const response = await apiClient.post(API_PATHS.auth.tfaLink)
    return response.data
  },

  tfaVerify: async (
    code: string,
  ): Promise<{ success: boolean; redirect: string }> => {
    const response = await apiClient.post(API_PATHS.auth.tfaVerify, { code })
    return response.data
  },

  tfaResend: async (): Promise<{ success: boolean }> => {
    const response = await apiClient.post(API_PATHS.auth.tfaResend)
    return response.data
  },
}
