import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { leaderboardApi } from '@/lib/api'
import { LeaderboardOrderBy } from '@/types'

export const leaderboardKeys = {
  all: ['leaderboard'] as const,
  players: (params?: {
    server?: string
    limit?: number
    order_by?: LeaderboardOrderBy
  }) => [...leaderboardKeys.all, 'players', params] as const,
  families: (params?: {
    server?: string
    limit?: number
    order_by?: LeaderboardOrderBy
  }) => [...leaderboardKeys.all, 'families', params] as const,
  characters: (params?: { server?: string; limit?: number }) =>
    [...leaderboardKeys.all, 'characters', params] as const,
  top: (
    type: 'players' | 'families',
    params?: { limit?: number; server?: string },
  ) => [...leaderboardKeys.all, 'top', type, params] as const,
}

export function useLeaderboardPlayers(params?: {
  server?: string
  limit?: number
  order_by?: LeaderboardOrderBy
}) {
  return useInfiniteQuery({
    queryKey: leaderboardKeys.players(params),
    queryFn: ({ pageParam = 1 }) =>
      leaderboardApi.getPlayers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
      return undefined
    },
    staleTime: 60 * 1000,
  })
}

export function useLeaderboardFamilies(params?: {
  server?: string
  limit?: number
  order_by?: LeaderboardOrderBy
}) {
  return useInfiniteQuery({
    queryKey: leaderboardKeys.families(params),
    queryFn: ({ pageParam = 1 }) =>
      leaderboardApi.getFamilies({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
      return undefined
    },
    staleTime: 60 * 1000,
  })
}

export function useLeaderboardTop(
  type: 'players' | 'families',
  params?: { limit?: number; server?: string },
) {
  return useQuery({
    queryKey: leaderboardKeys.top(type, params),
    queryFn: () => leaderboardApi.getTop(type, params),
    staleTime: 60 * 1000,
  })
}
