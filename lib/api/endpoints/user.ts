import { apiClient } from '../client'
import { User, ClaimStatus, ClaimSource } from '@/types'
import { API_PATHS } from '../paths'

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get(API_PATHS.user.profile)
    return response.data?.user
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch(API_PATHS.user.profile, data)
    return response.data?.user
  },

  uploadAvatar: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await apiClient.post(API_PATHS.user.avatar, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  uploadCover: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('cover', file)
    const response = await apiClient.post(API_PATHS.user.cover, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  uploadBackground: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData()
    formData.append('background', file)
    const response = await apiClient.post(API_PATHS.user.background, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  deleteCover: async (): Promise<void> => {
    await apiClient.delete(API_PATHS.user.cover)
  },

  deleteBackground: async (): Promise<void> => {
    await apiClient.delete(API_PATHS.user.background)
  },

  getCharacters: async (): Promise<{
    characters: Array<{
      id: number
      nickname: string
      server_id: string
      static_id: number | null
      is_primary: boolean
      source: ClaimSource
    }>
    verified_modes: { capt: boolean; gangame: boolean }
    capt_meta?: { nickname: string; server_id: string }
    gang_meta?: { nickname: string; server_id: string }
    capt_bindings?: Record<string, string>
  }> => {
    const response = await apiClient.get(API_PATHS.user.characters)
    return response.data
  },

  updateCfg: async (
    cfg: Record<string, any>,
  ): Promise<{ cfg: Record<string, any> }> => {
    const response = await apiClient.patch(API_PATHS.user.cfg, { cfg })
    return response.data
  },

  updateNickStyle: async (data: {
    nick_color?: string
    nick_prefix?: string
    nick_suffix?: string
  }) => {
    const response = await apiClient.patch(API_PATHS.user.nickStyle, data)
    return response.data
  },

  getMergeRequests: async (): Promise<{
    requests: Array<{
      id: number
      primary_nick: string
      merge_nick: string
      server_from?: string
      server_to?: string
      status: ClaimStatus
      admin_note?: string
      created_at: string
    }>
  }> => {
    const response = await apiClient.get(API_PATHS.user.mergeRequests)
    return response.data
  },

  submitMergeRequest: async (data: {
    primary_nick: string
    merge_nick: string
    server_from: string
    server_to: string
    proof?: string
    merge_mode?: ClaimSource
  }) => {
    const response = await apiClient.post(API_PATHS.user.submitMerge, data)
    return response.data
  },

  getNickRequests: async (): Promise<{
    requests: Array<{
      id: number
      old_nickname: string
      new_nickname: string
      server_id?: string
      status: ClaimStatus
      admin_note?: string
      created_at: string
    }>
  }> => {
    const response = await apiClient.get(API_PATHS.user.nickRequests)
    return response.data
  },

  submitNickChange: async (data: {
    old_nickname: string
    new_nickname: string
    proof?: string
    server_id: string
  }) => {
    const response = await apiClient.post(API_PATHS.user.submitNickChange, data)
    return response.data
  },

  getBindings: async (): Promise<{
    avatars: Record<string, string>
    bindings: Record<string, string>
    gangame_bindings: Record<string, string>
    nickStyles: Record<
      string,
      { color: string; prefix: string; suffix: string }
    >
  }> => {
    const response = await apiClient.get(API_PATHS.user.bindings)
    return response.data
  },

  getNickStyles: async (): Promise<{
    styles: Record<string, { color: string; prefix: string; suffix: string }>
  }> => {
    const response = await apiClient.get(API_PATHS.user.nickStyles)
    return response.data
  },

  getSocials: async (): Promise<{
    socials: Record<string, { tg: string; twitch: string; youtube: string }>
  }> => {
    const response = await apiClient.get(API_PATHS.user.socials)
    return response.data
  },

  getCfgs: async (): Promise<{ cfgs: Record<string, any> }> => {
    const response = await apiClient.get(API_PATHS.user.cfgs)
    return response.data
  },

  updateStreamLinks: async (data: {
    twitch_username?: string
    youtube_channel_id?: string
    primary_platform?: 'twitch' | 'youtube' | 'none'
  }) => {
    const response = await apiClient.patch(API_PATHS.user.streamLinks, data)
    return response.data
  },
}
