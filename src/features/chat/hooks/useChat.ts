
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  deleteMessage,
  getConversationMessages,
  getConversations,
  sendMessage,
} from '../services/chat.service'

import type { SendMessagePayload } from '../types/chat.types'

export const chatKeys = {
  all: ['chat'] as const,

  conversations: () => [...chatKeys.all, 'conversations'] as const,

  messages: (conversationId: string) =>
    [...chatKeys.all, 'messages', conversationId] as const,
}

export function useConversations() {
  return useQuery({
    queryKey: chatKeys.conversations(),
    queryFn: getConversations,
  })
}

export function useConversationMessages(conversationId: string | null) {
  return useQuery({
    queryKey: chatKeys.messages(conversationId ?? ''),
    queryFn: () => getConversationMessages(conversationId!),
    enabled: Boolean(conversationId),
  })
}

export function useSendMessage(conversationId: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => {
      if (!conversationId) {
        throw new Error('Select a conversation before sending a message.')
      }

      return sendMessage(conversationId, payload)
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(conversationId ?? ''),
        }),
        queryClient.invalidateQueries({
          queryKey: chatKeys.conversations(),
        }),
      ])
    },
  })
}

export function useDeleteMessage(conversationId: string | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(conversationId ?? ''),
        }),
        queryClient.invalidateQueries({
          queryKey: chatKeys.conversations(),
        }),
      ])
    },
  })
}