import { MoreVertical, Phone, Video, PanelLeft } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import type { ActiveConversation, Conversation } from '../types/chat.types'
import { ChatSidebar } from './ChatSidebar'

interface ChatHeaderProps {
  conversation: ActiveConversation
  selectedConversationId: string
  searchValue: string
  showUnreadOnly: boolean
  onSearchChange: (value: string) => void
  onConversationSelect: (conversation: Conversation) => void
  onToggleUnread: () => void
  onAction: (action: 'video' | 'phone' | 'more') => void
}

export function ChatHeader({
  conversation,
  selectedConversationId,
  searchValue,
  showUnreadOnly,
  onSearchChange,
  onConversationSelect,
  onToggleUnread,
  onAction,
}: ChatHeaderProps) {
  const initials = conversation.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <header className="flex h-15 ps-5 pe-25 py-4 shrink-0 items-center justify-between border-b 
    border-app-neutral-lighter ">
      <div className="flex min-w-0 items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7 md:hidden"
              aria-label="Open conversations"
            >
              <PanelLeft className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px] p-0 sm:w-[320px]">
            <SheetHeader className="sr-only">
              <SheetTitle>Conversations</SheetTitle>
            </SheetHeader>

            <ChatSidebar
              selectedConversationId={selectedConversationId}
              searchValue={searchValue}
              showUnreadOnly={showUnreadOnly}
              onSearchChange={onSearchChange}
              onConversationSelect={onConversationSelect}
              onToggleUnread={onToggleUnread}
            />
          </SheetContent>
        </Sheet>

        <Avatar className="size-12.5 shrink-0">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium text-app-secondary">
            {conversation.name}
          </p>

          {conversation.isOnline && (
            <p className="text-[10px] text-green-500">Online</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction('video')}
          aria-label="Start video call"
          className="size-7 text-app-secondary"
        >
          <Video className="size-6" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction('phone')}
          aria-label="Start voice call"
          className="size-7 text-app-secondary"
        >
          <Phone className="size-6" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction('more')}
          aria-label="More conversation options"
          className="size-7 text-app-secondary"
        >
          <MoreVertical className="size-6" />
        </Button>
      </div>
    </header>
  )
}