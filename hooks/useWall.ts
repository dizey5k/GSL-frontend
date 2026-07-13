import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wallApi } from '@/lib/api'

export const wallKeys = {
  all: ['wall'] as const,
  posts: (target: string) => [...wallKeys.all, 'posts', target] as const,
}

export function useWallPosts(target: string) {
  return useQuery({
    queryKey: wallKeys.posts(target),
    queryFn: () => wallApi.getPosts(target),
    enabled: !!target,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  })
}

export function useCreateWallPost(target: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: string) => wallApi.createPost(target, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wallKeys.posts(target) })
    },
  })
}

export function useLikeWallPost(target: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: number) => wallApi.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wallKeys.posts(target) })
    },
  })
}

export function useReplyWallPost(target: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, body }: { postId: number; body: string }) =>
      wallApi.replyPost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wallKeys.posts(target) })
    },
  })
}

export function useRepostWallPost(target: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ postId, body }: { postId: number; body?: string }) =>
      wallApi.repostPost(postId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wallKeys.posts(target) })
    },
  })
}

export function useDeleteWallPost(target: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: number) => wallApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wallKeys.posts(target) })
    },
  })
}
