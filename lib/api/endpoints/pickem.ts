import { apiClient } from '../client'
import { PickemFeed, PickemLeaderboardEntry } from '@/types'
import { API_PATHS } from '../paths'

export const pickemApi = {
  getCampaigns: async () => {
    const response = await apiClient.get(API_PATHS.pickem.campaigns)
    return response.data?.campaigns || []
  },

  getCampaign: async (slug: string) => {
    const response = await apiClient.get(API_PATHS.pickem.campaign(slug))
    return response.data?.campaign
  },

  getFeed: async (slug: string): Promise<PickemFeed> => {
    const response = await apiClient.get(API_PATHS.pickem.feed(slug))
    return response.data
  },

  submitPick: async (data: {
    campaign_id: number
    question_id: number
    option_id?: number
    value_text?: string
  }) => {
    const response = await apiClient.post(API_PATHS.pickem.picks, data)
    return response.data
  },

  getLeaderboard: async (
    campaignId: number,
  ): Promise<PickemLeaderboardEntry[]> => {
    const response = await apiClient.get(
      API_PATHS.pickem.leaderboard(campaignId),
    )
    return response.data?.entries || []
  },

  getMyStats: async () => {
    const response = await apiClient.get(API_PATHS.pickem.myStats)
    return response.data
  },

  subscribeSSE: (
    campaignId: number,
    onMessage: (data: any) => void,
  ): EventSource => {
    const url = `/api/pickem/campaigns/${campaignId}/stream`
    const es = new EventSource(url)
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (e) {}
    }
    return es
  },
}
