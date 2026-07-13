import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dmApi } from '@/lib/api'

export const dmKeys = {
  all: ['dm'] as const,
  threads: () => [...dmKeys.all, 'threads'] as const,
  thread: (userId: number) => [...dmKeys.all, 'thread', userId] as const,
}

export function useDMThreads() {
  return useQuery({
    queryKey: dmKeys.threads(),
    queryFn: () => dmApi.getThreads(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  })
}

export function useDMThread(userId: number) {
  return useQuery({
    queryKey: dmKeys.thread(userId),
    queryFn: () => dmApi.getThread(userId),
    enabled: !!userId,
    staleTime: 10 * 1000,
    refetchInterval: 10 * 1000,
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, body }: { userId: number; body: string }) =>
      dmApi.sendMessage(userId, body),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: dmKeys.thread(userId) })
      queryClient.invalidateQueries({ queryKey: dmKeys.threads() })
    },
  })
}

export function useSendTyping() {
  return useMutation({
    mutationFn: (userId: number) => dmApi.sendTyping(userId),
  })
}
