import { SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { conversations } from '../data/chat.data'
import type { Conversation } from '../types/chat.types'
import { ConversationItem } from './ConversationItem'
import { ConversationSearch } from './ConversationSearch'

interface ChatSidebarProps {
  selectedConversationId: string
  searchValue: string
  showUnreadOnly: boolean
  onSearchChange: (value: string) => void
  onConversationSelect: (conversation: Conversation) => void
  onToggleUnread: () => void
}

export function ChatSidebar({
  selectedConversationId,
  searchValue,
  showUnreadOnly,
  onSearchChange,
  onConversationSelect,
  onToggleUnread,
}: ChatSidebarProps) {
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.name
      .toLowerCase()
      .includes(searchValue.toLowerCase())

    const matchesUnread =
      !showUnreadOnly || Boolean(conversation.unreadCount)

    return matchesSearch && matchesUnread
  })

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-app-neutral-lighter md:w-[210px] lg:w-[235px]">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-app-neutral-lighter px-3">
        <h1 className="text-5 font-medium text-app-secondary">Chat</h1>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleUnread}
          aria-label={
            showUnreadOnly
              ? 'Show all conversations'
              : 'Show unread conversations'
          }
          className={[
            'size-6',
            showUnreadOnly
              ? 'bg-app-primary/10 text-app-primary'
              : 'text-app-neutral-darker',
          ].join(' ')}
        >
          <SlidersHorizontal className="size-5" />
        </Button>
      </div>

      <ConversationSearch
        value={searchValue}
        onChange={onSearchChange}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === selectedConversationId}
              onSelect={onConversationSelect}
            />
          ))
        ) : (
          <p className="px-3 py-6 text-center text-[9px] text-app-neutral-darker">
            No conversations found
          </p>
        )}
      </div>
    </aside>
  )
}