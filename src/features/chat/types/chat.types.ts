
export type MessageType = 'text' | 'image' | 'file' | 'voice' | 'video'

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'seen'

export interface ChatUser {
  id: string
  name: string
  email: string
  phone: string
  birth_date: string
  gender: string
  country: string
  language: string
  profile_image: string
  role: 'doctor' | 'patient' | string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  type: MessageType
  content: string | null
  media_url: string | null
  media_duration: number | string | null
  file_name: string | null
  file_size: number | null
  status: MessageStatus
  is_deleted_by_sender: boolean
  is_deleted_by_receiver: boolean
  delivered_at: string | null
  seen_at: string | null
  created_at: string
  sender: ChatUser
  receiver: ChatUser
}

export interface Conversation {
  id: string
  other_user: ChatUser
  last_message: ChatMessage | null
  unread_count: number
  last_message_at: string | null
  created_at: string
}

export interface Pagination {
  current_page: number
  last_page: number
  per_page?: number
  total: number
  has_more_pages: boolean
}

export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface ConversationsData {
  conversations: Conversation[]
  current_page: number
  last_page: number
  total: number
  has_more_pages: boolean
}

export interface MessagesData {
  messages: ChatMessage[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  has_more_pages: boolean
}

export interface SendMessagePayload {
  type: 'text'
  content: string
}