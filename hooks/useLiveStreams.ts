import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { API_PATHS } from '@/lib/api/paths'

export const liveKeys = {
  all: ['live'] as const,
  streams: () => [...liveKeys.all, 'streams'] as const,
}

export function useLiveStreams() {
  return useQuery({
    queryKey: liveKeys.streams(),
    queryFn: async () => {
      const res = await apiClient.get(API_PATHS.media.live)
      return res.data?.streams || []
    },
    staleTime: 60 * 1000,
    refetchInterval: 120 * 1000,
  })
}
