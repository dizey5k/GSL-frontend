import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import { useUserStore } from '@/store'

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  claim: () => [...userKeys.all, 'claim'] as const,
}

export function useUser() {
  const setUser = useUserStore((state) => state.setUser)
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const data = await authApi.me()
      setUser(data.user || null)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  })
}

export function useClaimStatus() {
  return useQuery({
    queryKey: userKeys.claim(),
    queryFn: () => authApi.getClaimStatus(),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: true,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const clearUser = useUserStore((state) => state.clearUser)
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearUser()
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.removeQueries({ queryKey: userKeys.all })
    },
  })
}

export function useSubmitClaim() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof authApi.submitClaim>[0]) =>
      authApi.submitClaim(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.claim() })
    },
  })
}

// 2FA
export function useTfaStatus() {
  return useQuery({
    queryKey: [...userKeys.all, 'tfa', 'status'],
    queryFn: () => authApi.tfaStatus(),
    staleTime: 60 * 1000,
  })
}

export function useTfaLink() {
  return useMutation({
    mutationFn: () => authApi.tfaLink(),
  })
}

export function useTfaVerify() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (code: string) => authApi.tfaVerify(code),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...userKeys.all, 'tfa', 'status'],
      })
    },
  })
}

export function useTfaResend() {
  return useMutation({
    mutationFn: () => authApi.tfaResend(),
  })
}
