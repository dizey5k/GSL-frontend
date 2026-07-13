import { useQuery } from '@tanstack/react-query'
import { duelApi } from '@/lib/api'

export const duelKeys = {
  all: ['duel'] as const,
  player: (nick: string, server?: string) =>
    [...duelKeys.all, 'player', nick, server || ''] as const,
  history: (nick: string, params?: any) =>
    [...duelKeys.all, 'history', nick, params] as const,
  chart: (nick: string, params?: any) =>
    [...duelKeys.all, 'chart', nick, params] as const,
  servers: (nick: string) => [...duelKeys.all, 'servers', nick] as const,
  leaderboard: (params?: any) =>
    [...duelKeys.all, 'leaderboard', params] as const,
  search: (query: string) => [...duelKeys.all, 'search', query] as const,
  compare: (nick1: string, nick2: string) =>
    [...duelKeys.all, 'compare', nick1, nick2] as const,
}

export function useDuelPlayer(nick: string, server?: string) {
  return useQuery({
    queryKey: duelKeys.player(nick, server),
    queryFn: () => duelApi.getPlayer(nick, server),
    enabled: !!nick && nick.length > 0,
    staleTime: 60 * 1000,
  })
}

export function useDuelHistory(
  nick: string,
  params?: { per_page?: number; page?: number; server?: string },
) {
  return useQuery({
    queryKey: duelKeys.history(nick, params),
    queryFn: () => duelApi.getHistory(nick, params),
    enabled: !!nick && nick.length > 0,
    staleTime: 60 * 1000,
  })
}

export function useDuelChart(
  nick: string,
  params?: { limit?: number; server?: string },
) {
  return useQuery({
    queryKey: duelKeys.chart(nick, params),
    queryFn: () => duelApi.getChart(nick, params),
    enabled: !!nick && nick.length > 0,
    staleTime: 60 * 1000,
  })
}

export function useDuelServers(nick: string) {
  return useQuery({
    queryKey: duelKeys.servers(nick),
    queryFn: () => duelApi.getServers(nick),
    enabled: !!nick && nick.length > 0,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDuelLeaderboard(params?: {
  server?: string
  page?: number
  per_page?: number
}) {
  return useQuery({
    queryKey: duelKeys.leaderboard(params),
    queryFn: () => duelApi.getLeaderboard(params),
    staleTime: 60 * 1000,
  })
}

export function useDuelSearch(query: string) {
  return useQuery({
    queryKey: duelKeys.search(query),
    queryFn: () => duelApi.search(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  })
}

export function useDuelCompare(nick1: string, nick2: string) {
  return useQuery({
    queryKey: duelKeys.compare(nick1, nick2),
    queryFn: () => duelApi.compare(nick1, nick2),
    enabled: !!nick1 && !!nick2 && nick1.length > 0 && nick2.length > 0,
    staleTime: 60 * 1000,
  })
}
