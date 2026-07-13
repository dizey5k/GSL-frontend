import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { playersApi } from '@/lib/api'

export const playerKeys = {
  all: ['player'] as const,
  detail: (nick: string, server?: string) =>
    [...playerKeys.all, nick, server || ''] as const,
  history: (nick: string, options?: any) =>
    [...playerKeys.all, nick, 'history', options] as const,
  rank: (nick: string) => [...playerKeys.all, nick, 'rank'] as const,
  ratingHistory: (nick: string, options?: any) =>
    [...playerKeys.all, nick, 'rating-history', options] as const,
  search: (query: string) => [...playerKeys.all, 'search', query] as const,
  compare: (p1: string, p2: string) =>
    [...playerKeys.all, 'compare', p1, p2] as const,
}

export function usePlayer(nick: string, server?: string) {
  return useQuery({
    queryKey: playerKeys.detail(nick, server),
    queryFn: () => playersApi.get(nick, server),
    enabled: !!nick,
    staleTime: 60 * 1000,
  })
}

export function usePlayerHistory(
  nick: string,
  options?: { period?: string; limit?: number; server?: string },
) {
  return useQuery({
    queryKey: playerKeys.history(nick, options),
    queryFn: () => playersApi.getHistory(nick, options),
    enabled: !!nick,
    staleTime: 60 * 1000,
  })
}

export function usePlayerRank(nick: string) {
  return useQuery({
    queryKey: playerKeys.rank(nick),
    queryFn: () => playersApi.getRank(nick),
    enabled: !!nick,
    staleTime: 5 * 60 * 1000,
  })
}

export function usePlayerRatingHistory(
  nick: string,
  options?: { limit?: number; server?: string },
) {
  return useQuery({
    queryKey: playerKeys.ratingHistory(nick, options),
    queryFn: () => playersApi.getRatingHistory(nick, options),
    enabled: !!nick,
    staleTime: 60 * 1000,
  })
}

export function usePlayerSearch(query: string) {
  return useQuery({
    queryKey: playerKeys.search(query),
    queryFn: () => playersApi.search(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  })
}

export function useComparePlayers(player1: string, player2: string) {
  return useQuery({
    queryKey: playerKeys.compare(player1, player2),
    queryFn: () => playersApi.compare(player1, player2),
    enabled: !!player1 && !!player2,
    staleTime: 60 * 1000,
  })
}
