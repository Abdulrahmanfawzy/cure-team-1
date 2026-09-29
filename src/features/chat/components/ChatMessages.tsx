import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'

import type { ChatMessage as ChatMessageType } from '../types/chat.types'
import { ChatMessage } from './ChatMessage'

interface ChatMessagesProps {
  messages: ChatMessageType[]
  onCopy: (content: string) => void
}

export function ChatMessages({
  messages,
  onCopy,
}: ChatMessagesProps) {
  return (
    <div className="min-h-0 flex-1">
      <MessageScrollerProvider
        autoScroll
        defaultScrollPosition="end"
        scrollPreviousItemPeek={48}
      >
        <MessageScroller className="h-full">
          <MessageScrollerViewport
            aria-label="Conversation messages"
            className="scroll-fade"
          >
            <MessageScrollerContent className="py-3">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor={message.sender === 'me'}
                >
                  <ChatMessage
                    message={message}
                    onCopy={onCopy}
                  />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>

          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}