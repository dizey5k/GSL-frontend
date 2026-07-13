import { apiClient } from '../client'
import { WallPostStatus } from '@/types'
import { API_PATHS } from '../paths'

export const wallApi = {
  getPosts: async (target: string) => {
    const response = await apiClient.get(API_PATHS.wall.posts(target))
    return response.data?.posts || []
  },

  createPost: async (target: string, body: string) => {
    const response = await apiClient.post(API_PATHS.wall.posts(target), {
      body,
    })
    return response.data
  },

  likePost: async (postId: number) => {
    const response = await apiClient.post(API_PATHS.wall.like(postId))
    return response.data
  },

  replyPost: async (postId: number, body: string) => {
    const response = await apiClient.post(API_PATHS.wall.reply(postId), {
      body,
    })
    return response.data
  },

  repostPost: async (postId: number, body?: string) => {
    const response = await apiClient.post(API_PATHS.wall.repost(postId), {
      body: body || '',
    })
    return response.data
  },

  deletePost: async (postId: number) => {
    const response = await apiClient.delete(API_PATHS.wall.delete(postId))
    return response.data
  },

  admin: {
    getPosts: async (status: WallPostStatus, q?: string) => {
      const params = { status, ...(q && { q }) }
      const response = await apiClient.get(API_PATHS.wall.admin, { params })
      return response.data?.posts || []
    },
    updatePost: async (postId: number, data: { status: WallPostStatus }) => {
      const response = await apiClient.patch(
        API_PATHS.wall.adminAction(postId),
        data,
      )
      return response.data
    },
    deletePost: async (postId: number) => {
      const response = await apiClient.delete(
        API_PATHS.wall.adminAction(postId),
      )
      return response.data
    },
  },
}
