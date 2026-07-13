import { apiClient } from '../client'
import { DMThread, DMMessage } from '@/types'
import { API_PATHS } from '../paths'

export const dmApi = {
  getThreads: async (): Promise<DMThread[]> => {
    const response = await apiClient.get(API_PATHS.dm.threads)
    return response.data?.threads || []
  },

  getThread: async (
    userId: number,
  ): Promise<{ peer: any; messages: DMMessage[] }> => {
    const response = await apiClient.get(API_PATHS.dm.thread(userId))
    return response.data
  },

  sendMessage: async (
    userId: number,
    body: string,
  ): Promise<{ success: boolean }> => {
    const response = await apiClient.post(API_PATHS.dm.thread(userId), { body })
    return response.data
  },

  sendTyping: async (userId: number): Promise<void> => {
    await apiClient.post(API_PATHS.dm.typing(userId))
  },

  // SSE stream (не через axios, а через EventSource)
  getStreamUrl: () => API_PATHS.dm.stream,
}
