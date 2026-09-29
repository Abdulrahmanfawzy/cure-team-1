import type {
  ActiveConversation,
  ChatMessage,
  Conversation,
} from '../types/chat.types'

const avatar =
  'https://raw.githubusercontent.com/Abdulrahmanfawzy/cure-team-1/dev/src/assets/images/profile-avatar.jpg'

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Dr. Robert Lewis',
    avatar,
    lastMessage: "It's been around six...",
    time: '5:30 PM',
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Jana',
    avatar,
    lastMessage: 'you: ok i will do it like...',
    time: '1:25 PM',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Dr. Jessica Turner',
    avatar,
    lastMessage: "It's been around six...",
    time: 'Yesterday',
  },
  {
    id: '4',
    name: 'Dr. Jessica',
    avatar,
    lastMessage: "It's been around six...",
    time: '2 days',
  },
]

export const activeConversation: ActiveConversation = {
  id: '1',
  name: 'Dr. Robert Lewis',
  avatar,
  isOnline: true,
}

export const initialMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'text',
    content: "Hi it's been a while",
    time: '10:30 AM',
    sender: 'doctor',
  },
  {
    id: '2',
    type: 'text',
    content: 'Hi doctor that right',
    time: '10:31 AM',
    sender: 'me',
  },
  {
    id: '3',
    type: 'text',
    content: 'I was okey,\nbut now i suffer form issues',
    time: '10:32 AM',
    sender: 'me',
  },
  {
    id: '4',
    type: 'text',
    content: 'I feel bad',
    time: '10:34 AM',
    sender: 'doctor',
  },
  {
    id: '5',
    type: 'text',
    content: 'What about you visit me',
    time: '10:35 AM',
    sender: 'doctor',
  },
  {
    id: '6',
    type: 'text',
    content: "i free tomorrow,\nit's been around six PM",
    time: '10:36 AM',
    sender: 'doctor',
  },
  {
    id: '7',
    type: 'voice',
    time: '10:38 AM',
    sender: 'me',
    duration: '00:04',
  },
]