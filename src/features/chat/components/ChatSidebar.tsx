import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Conversation } from "../types/chat.types";
import { ConversationItem } from "./ConversationItem";
import { ConversationSearch } from "./ConversationSearch";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  searchValue: string;
  showUnreadOnly: boolean;
  onSearchChange: (value: string) => void;
  onConversationSelect: (conversation: Conversation) => void;
  onToggleUnread: () => void;
  isLoading?: boolean;
}

export function ChatSidebar({
  conversations,
  selectedConversationId,
  searchValue,
  showUnreadOnly,
  onSearchChange,
  onConversationSelect,
  onToggleUnread,
  isLoading = false,
}: ChatSidebarProps) {
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = conversation.other_user.name
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase());

    const matchesUnread = !showUnreadOnly || conversation.unread_count > 0;

    return matchesSearch && matchesUnread;
  });

  return (
    <aside
      className="flex h-full w-full shrink-0 flex-col border-r border-app-neutral-lighter
     md:w-65 lg:w-75"
    >
      <div
        className="flex h-12 shrink-0 items-center justify-between border-b 
      border-app-neutral-lighter px-3"
      >
        <h1 className="text-sm font-medium text-app-secondary">Chat</h1>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleUnread}
          aria-label={
            showUnreadOnly ? "Show all conversations" : "Show unread only"
          }
          className={showUnreadOnly ? "text-app-primary" : ""}
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </div>

      <ConversationSearch value={searchValue} onChange={onSearchChange} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="px-3 py-6 text-center text-sm text-app-neutral-darker">
            Loading conversations...
          </p>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === selectedConversationId}
              onSelect={onConversationSelect}
            />
          ))
        ) : (
          <p className="px-3 py-6 text-center text-sm text-app-neutral-darker">
            No conversations found
          </p>
        )}
      </div>
    </aside>
  );
}
