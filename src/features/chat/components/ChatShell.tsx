import { useMemo, useState } from "react";

import { toast } from "sonner";

import { activeConversation, initialMessages } from "../data/chat.data";
import type { ChatMessage, Conversation } from "../types/chat.types";

import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { ChatSidebar } from "./ChatSidebar";

export function ChatShell() {
  const [selectedConversationId, setSelectedConversationId] = useState(
    activeConversation.id,
  );

  const [searchValue, setSearchValue] = useState("");

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const selectedConversation = useMemo(
    () => ({
      ...activeConversation,
      id: selectedConversationId,
    }),
    [selectedConversationId],
  );

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      type: "text",
      content,
      time: "Now",
      sender: "me",
      isRead: false,
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
  };

  const handleCopyMessage = async (content: string) => {
    if (!content) {
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      toast.success("Message copied");
    } catch {
      toast.error("Unable to copy message");
    }
  };

  const handleHeaderAction = (action: "video" | "phone" | "more") => {
    const labels = {
      video: "Video call",
      phone: "Voice call",
      more: "Conversation options",
    };

    toast.info(`${labels[action]} is UI-only for now`);
  };

  return (
    <div
      className="flex h-[calc(100dvh-7rem)] min-h-125 w-full overflow-hidden mt-25 
    rounded-lg border border-app-neutral-lighter bg-white shadow-sm"
    >
      <div className="hidden h-full md:flex">
        <ChatSidebar
          selectedConversationId={selectedConversationId}
          searchValue={searchValue}
          showUnreadOnly={showUnreadOnly}
          onSearchChange={setSearchValue}
          onConversationSelect={handleConversationSelect}
          onToggleUnread={() => setShowUnreadOnly((current) => !current)}
        />
      </div>

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          conversation={selectedConversation}
          selectedConversationId={selectedConversationId}
          searchValue={searchValue}
          showUnreadOnly={showUnreadOnly}
          onSearchChange={setSearchValue}
          onConversationSelect={handleConversationSelect}
          onToggleUnread={() => setShowUnreadOnly((current) => !current)}
          onAction={handleHeaderAction}
        />

        <ChatMessages messages={messages} onCopy={handleCopyMessage} />

        <ChatInput onSend={handleSendMessage} />
      </main>
    </div>
  );
}
