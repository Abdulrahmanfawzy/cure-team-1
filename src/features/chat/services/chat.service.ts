import { apiClient } from "@/services/axios/client";

import type {
  ApiResponse,
  Conversation,
  ConversationsData,
  ChatMessage,
  MessagesData,
  SendMessagePayload,
} from "../types/chat.types";

export interface ConversationsResult {
  conversations: Conversation[];
  pagination: {
    current_page: number;
    last_page: number;
    total: number;
    has_more_pages: boolean;
  };
}

export async function getConversations(): Promise<ConversationsResult> {
  const { data } =
    await apiClient.get<ApiResponse<ConversationsData>>("/conversations");

  return {
    conversations: data.data.conversations,
    pagination: {
      current_page: data.data.current_page,
      last_page: data.data.last_page,
      total: data.data.total,
      has_more_pages: data.data.has_more_pages,
    },
  };
}

export async function getConversationMessages(
  conversationId: string,
): Promise<MessagesData> {
  const { data } = await apiClient.get<ApiResponse<MessagesData>>(
    `/conversations/${conversationId}/messages`,
  );

  return data.data;
}

export async function sendMessage(
  conversationId: string,
  payload: SendMessagePayload,
): Promise<ChatMessage[]> {
  const { data } = await apiClient.post<ApiResponse<MessagesData>>(
    `/conversations/${conversationId}/messages`,
    payload,
  );

  return data.data.messages;
}

export async function deleteMessage(messageId: string): Promise<string> {
  const { data } = await apiClient.delete<ApiResponse<string>>(
    `/messages/${messageId}`,
  );

  return data.data;
}
