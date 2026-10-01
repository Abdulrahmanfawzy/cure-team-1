import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import type { ChatMessage as ChatMessageType } from "../types/chat.types";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  otherUserId: string;
  onCopy: (content: string) => void;
  onDelete: (messageId: string) => void;
}

export function ChatMessages({
  messages,
  otherUserId,
  onCopy,
  onDelete,
}: ChatMessagesProps) {
  const orderedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  if (!messages.length) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-sm text-app-neutral-darker">
          No messages yet. Start the conversation.
        </p>
      </div>
    );
  }

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
              {orderedMessages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  scrollAnchor
                >
                  <ChatMessage
                    message={message}
                    isMine={message.sender_id !== otherUserId}
                    onCopy={onCopy}
                    onDelete={onDelete}
                  />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>

          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}
