import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clubsApi } from '@/lib/api'

export const clubsKeys = {
  all: ['clubs'] as const,
  families: () => [...clubsKeys.all, 'families'] as const,
  players: () => [...clubsKeys.all, 'players'] as const,
  myProfile: () => [...clubsKeys.all, 'myProfile'] as const,
}

export function useClubFamilies() {
  return useQuery({
    queryKey: clubsKeys.families(),
    queryFn: () => clubsApi.getFamilies(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useClubPlayers() {
  return useQuery({
    queryKey: clubsKeys.players(),
    queryFn: () => clubsApi.getPlayers(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useMyClubProfile() {
  return useQuery({
    queryKey: clubsKeys.myProfile(),
    queryFn: () => clubsApi.getMyProfile(),
    staleTime: 60 * 1000,
  })
}

export function useUpdateMyClubProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof clubsApi.updateMyProfile>[0]) =>
      clubsApi.updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubsKeys.myProfile() })
    },
  })
}

export function useDeleteMyClubProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => clubsApi.deleteMyProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubsKeys.myProfile() })
    },
  })
}
