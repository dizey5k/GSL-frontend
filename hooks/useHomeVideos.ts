import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { API_PATHS } from '@/lib/api/paths'

export const videoKeys = {
  all: ['home-videos'] as const,
  list: () => [...videoKeys.all, 'list'] as const,
}

export function useHomeVideos() {
  return useQuery({
    queryKey: videoKeys.list(),
    queryFn: async () => {
      const res = await apiClient.get(API_PATHS.home.videos)
      return res.data?.videos || []
    },
    staleTime: 5 * 60 * 1000,
  })
}
