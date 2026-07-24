import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pickemApi } from '@/lib/api'

export const pickemKeys = {
  all: ['pickem'] as const,
  campaigns: () => [...pickemKeys.all, 'campaigns'] as const,
  campaign: (slug: string) => [...pickemKeys.all, 'campaign', slug] as const,
  feed: (slug: string) => [...pickemKeys.all, 'feed', slug] as const,
  leaderboard: (campaignId: number) =>
    [...pickemKeys.all, 'leaderboard', campaignId] as const,
  myStats: () => [...pickemKeys.all, 'myStats'] as const,
}

export function usePickemCampaigns() {
  return useQuery({
    queryKey: pickemKeys.campaigns(),
    queryFn: () => pickemApi.getCampaigns(),
    staleTime: 5 * 60 * 1000,
  })
}

export function usePickemCampaign(slug: string) {
  return useQuery({
    queryKey: pickemKeys.campaign(slug),
    queryFn: () => pickemApi.getCampaign(slug),
    enabled: !!slug,
    staleTime: 60 * 1000,
  })
}

export function usePickemFeed(slug: string) {
  return useQuery({
    queryKey: pickemKeys.feed(slug),
    queryFn: () => pickemApi.getFeed(slug),
    enabled: !!slug,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  })
}

export function usePickemLeaderboard(campaignId: number) {
  return useQuery({
    queryKey: pickemKeys.leaderboard(campaignId),
    queryFn: () => pickemApi.getLeaderboard(campaignId),
    enabled: !!campaignId,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  })
}

export function usePickemMyStats() {
  return useQuery({
    queryKey: pickemKeys.myStats(),
    queryFn: async () => {
      try {
        const result = await pickemApi.getMyStats()
        return result
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'response' in err) {
          const axiosError = err as { response?: { status?: number } }
          if (axiosError.response?.status === 401) {
            return null
          }
        }
        throw err
      }
    },
    staleTime: 60 * 1000,
    retry: (failureCount, error) => {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status === 401) return false
      }
      return failureCount < 2
    },
  })
}

export function usePickemSubmitPick() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof pickemApi.submitPick>[0]) =>
      pickemApi.submitPick(data),
    onSuccess: (_, { campaign_id }) => {
      queryClient.invalidateQueries({ queryKey: pickemKeys.feed('') })
      queryClient.invalidateQueries({ queryKey: pickemKeys.myStats() })
      queryClient.invalidateQueries({
        queryKey: pickemKeys.leaderboard(campaign_id),
      })
    },
  })
}
