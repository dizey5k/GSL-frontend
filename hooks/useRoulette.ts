// hooks/useRoulette.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { rouletteApi } from '@/lib/api'
import { RouletteSpinType, TicketBulkMode } from '@/types'
import { userKeys } from './useAuth'

export const rouletteKeys = {
  all: ['roulette'] as const,
  prizes: () => [...rouletteKeys.all, 'prizes'] as const,
  recent: (limit?: number) => [...rouletteKeys.all, 'recent', limit] as const,
  stats: () => [...rouletteKeys.all, 'stats'] as const,
  quests: () => [...rouletteKeys.all, 'quests'] as const,
  feed: (limit?: number) => [...rouletteKeys.all, 'feed', limit] as const,
}

export function useRoulettePrizes() {
  return useQuery({
    queryKey: rouletteKeys.prizes(),
    queryFn: () => rouletteApi.getPrizes(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useRouletteRecentWins(limit: number = 20) {
  return useQuery({
    queryKey: rouletteKeys.recent(limit),
    queryFn: () => rouletteApi.getRecentWins(limit),
    staleTime: 30 * 1000,
  })
}

export function useRouletteStats() {
  return useQuery({
    queryKey: rouletteKeys.stats(),
    queryFn: () => rouletteApi.getStats(),
    staleTime: 60 * 1000,
  })
}

export function useRouletteQuests() {
  return useQuery({
    queryKey: rouletteKeys.quests(),
    queryFn: () => rouletteApi.getQuestStatus(),
    staleTime: 30 * 1000,
  })
}

export function useSpin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (type: RouletteSpinType) => rouletteApi.spin(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rouletteKeys.stats() })
      queryClient.invalidateQueries({ queryKey: rouletteKeys.recent() })
      queryClient.invalidateQueries({ queryKey: rouletteKeys.feed() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useClaimQuest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => rouletteApi.claimQuest(key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rouletteKeys.quests() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

// Админские хуки для рулетки (можно добавить отдельно)
export function useRouletteFeed(limit: number = 50) {
  return useQuery({
    queryKey: rouletteKeys.feed(limit),
    queryFn: () => rouletteApi.getFeed(limit),
    staleTime: 60 * 1000,
  })
}
