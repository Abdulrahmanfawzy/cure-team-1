import { CheckCheck } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import type { Conversation } from '../types/chat.types'

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onSelect: (conversation: Conversation) => void
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: ConversationItemProps) {
  const initials = conversation.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation)}
      className={[
        'flex w-full items-center gap-2.5 border-b border-app-neutral-lightest px-2.5 py-2.5 text-left transition-colors',
        'hover:bg-app-neutral-lightest',
        isActive && 'bg-app-neutral-lightest',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative shrink-0">
        <Avatar className="size-12.5">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        {conversation.isOnline && (
          <span
            aria-label="Online"
            className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-green-500"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[16px] font-medium text-app-secondary">
            {conversation.name}
          </p>

          <span className="shrink-0 text-[12px] text-app-neutral-darker">
            {conversation.time}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            {conversation.name !== 'Dr. Robert Lewis' && (
              <CheckCheck className="size-2.5 shrink-0 text-app-primary" />
            )}

            <p className="truncate text-[12px] text-app-neutral-darker">
              {conversation.lastMessage}
            </p>
          </div>

          {conversation.unreadCount ? (
            <span className="flex size-5  shrink-0 items-center justify-center rounded-full
             bg-green-500 text-[12px] font-medium text-white">
              {conversation.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}