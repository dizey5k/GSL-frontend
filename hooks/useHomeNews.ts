import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { API_PATHS } from '@/lib/api/paths'

export const newsKeys = {
  all: ['home-news'] as const,
  list: (source?: string) =>
    [...newsKeys.all, 'list', source || 'all'] as const,
}

export function useHomeNews(source?: string) {
  return useQuery({
    queryKey: newsKeys.list(source),
    queryFn: async () => {
      const params = source && source !== 'all' ? { source } : {}
      const res = await apiClient.get(API_PATHS.home.news, { params })
      return res.data?.news || []
    },
    staleTime: 60 * 1000,
  })
}
