import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/lib/api'
import { userKeys } from './useAuth'

export const userProfileKeys = {
  all: ['userProfile'] as const,
  profile: () => [...userProfileKeys.all, 'profile'] as const,
  characters: () => [...userProfileKeys.all, 'characters'] as const,
  cfg: () => [...userProfileKeys.all, 'cfg'] as const,
  mergeRequests: () => [...userProfileKeys.all, 'mergeRequests'] as const,
  nickRequests: () => [...userProfileKeys.all, 'nickRequests'] as const,
  bindings: () => [...userProfileKeys.all, 'bindings'] as const,
  nickStyles: () => [...userProfileKeys.all, 'nickStyles'] as const,
  socials: () => [...userProfileKeys.all, 'socials'] as const,
  cfgs: () => [...userProfileKeys.all, 'cfgs'] as const,
}

export function useUserProfile() {
  return useQuery({
    queryKey: userProfileKeys.profile(),
    queryFn: () => userApi.getProfile(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.updateProfile>[0]) =>
      userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useUploadAvatar() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useUploadCover() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => userApi.uploadCover(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useUploadBackground() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => userApi.uploadBackground(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useDeleteCover() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userApi.deleteCover(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useDeleteBackground() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => userApi.deleteBackground(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useUserCharacters() {
  return useQuery({
    queryKey: userProfileKeys.characters(),
    queryFn: () => userApi.getCharacters(),
    staleTime: 60 * 1000,
  })
}

export function useUserCfg() {
  return useQuery({
    queryKey: userProfileKeys.cfg(),
    queryFn: () => userApi.getCfgs(),
    staleTime: 60 * 1000,
  })
}

export function useUpdateCfg() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (cfg: Record<string, any>) => userApi.updateCfg(cfg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.cfg() })
    },
  })
}

export function useUpdateNickStyle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.updateNickStyle>[0]) =>
      userApi.updateNickStyle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useMergeRequests() {
  return useQuery({
    queryKey: userProfileKeys.mergeRequests(),
    queryFn: () => userApi.getMergeRequests(),
    staleTime: 60 * 1000,
  })
}

export function useSubmitMergeRequest() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.submitMergeRequest>[0]) =>
      userApi.submitMergeRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.mergeRequests(),
      })
    },
  })
}

export function useNickRequests() {
  return useQuery({
    queryKey: userProfileKeys.nickRequests(),
    queryFn: () => userApi.getNickRequests(),
    staleTime: 60 * 1000,
  })
}

export function useSubmitNickChange() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.submitNickChange>[0]) =>
      userApi.submitNickChange(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.nickRequests(),
      })
    },
  })
}

export function useUserBindings() {
  return useQuery({
    queryKey: userProfileKeys.bindings(),
    queryFn: () => userApi.getBindings(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserNickStyles() {
  return useQuery({
    queryKey: userProfileKeys.nickStyles(),
    queryFn: () => userApi.getNickStyles(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserSocials() {
  return useQuery({
    queryKey: userProfileKeys.socials(),
    queryFn: () => userApi.getSocials(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserCfgs() {
  return useQuery({
    queryKey: userProfileKeys.cfgs(),
    queryFn: () => userApi.getCfgs(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useUpdateStreamLinks() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof userApi.updateStreamLinks>[0]) =>
      userApi.updateStreamLinks(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.profile() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}
