export type MessageType = 'text' | 'voice'

export type MessageSender = 'me' | 'doctor'

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount?: number
  isOnline?: boolean
}

export interface ChatMessage {
  id: string
  type: MessageType
  content?: string
  time: string
  sender: MessageSender
  duration?: string
  isRead?: boolean
}

export interface ActiveConversation {
  id: string
  name: string
  avatar: string
  isOnline?: boolean
}