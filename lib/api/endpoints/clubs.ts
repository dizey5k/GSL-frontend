import { apiClient } from '../client'
import { API_PATHS } from '../paths'

export const clubsApi = {
  getFamilies: async () => {
    const response = await apiClient.get(API_PATHS.clubs.families)
    return response.data?.families || []
  },

  getPlayers: async () => {
    const response = await apiClient.get(API_PATHS.clubs.players)
    return response.data?.players || []
  },

  getMyProfile: async () => {
    const response = await apiClient.get(API_PATHS.clubs.myPlayerProfile)
    return response.data?.profile || null
  },

  updateMyProfile: async (data: {
    main_server?: string
    roles?: string[]
    about?: string
    previous_clans?: string
    experience?: string
  }) => {
    const response = await apiClient.put(API_PATHS.clubs.myPlayerProfile, data)
    return response.data
  },

  deleteMyProfile: async () => {
    const response = await apiClient.delete(API_PATHS.clubs.myPlayerProfile)
    return response.data
  },
}
