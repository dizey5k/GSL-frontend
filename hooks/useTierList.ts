import { useInfiniteQuery } from '@tanstack/react-query'
import { leaderboardApi } from '@/lib/api'
import {
  LeaderboardPlayersResponse,
  LeaderboardFamiliesResponse,
} from '@/types'

type TierType = 'players' | 'families'

type ResponseType<T extends TierType> = T extends 'players'
  ? LeaderboardPlayersResponse
  : LeaderboardFamiliesResponse

export function useTierList<T extends TierType>(
  type: T,
  params?: { server?: string; order_by?: string; limit?: number },
) {
  const limit = params?.limit || 50
  const server = params?.server
  const order_by = params?.order_by || 'rating'

  const queryFn = async ({
    pageParam = 1,
  }: {
    pageParam: number
  }): Promise<ResponseType<T>> => {
    if (type === 'players') {
      return (await leaderboardApi.getPlayers({
        page: pageParam,
        limit,
        server: server || undefined,
        order_by: order_by as 'rating' | 'win_rate' | 'total_matches',
      })) as ResponseType<T>
    } else {
      return (await leaderboardApi.getFamilies({
        page: pageParam,
        limit,
        server: server || undefined,
        order_by: order_by as 'rating' | 'win_rate' | 'total_matches',
      })) as ResponseType<T>
    }
  }

  return useInfiniteQuery({
    queryKey: ['tier-list', type, params],
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
      return undefined
    },
    staleTime: 60 * 1000,
  })
}
