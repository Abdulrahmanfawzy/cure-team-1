import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useConversationMessages,
  useConversations,
  useDeleteMessage,
  useSendMessage,
} from "../hooks/useChat";

import type { Conversation } from "../types/chat.types";

import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { ChatSidebar } from "./ChatSidebar";

export function ChatShell() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const [searchValue, setSearchValue] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const conversationsQuery = useConversations();
  const conversations = conversationsQuery.data?.conversations ?? [];

  // Select the first conversation after the API data arrives.
  useEffect(() => {
    if (!selectedConversationId && conversations.length > 0) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId,
    ) ?? null;

  const messagesQuery = useConversationMessages(selectedConversationId);
  const sendMessageMutation = useSendMessage(selectedConversationId);
  const deleteMessageMutation = useDeleteMessage(selectedConversationId);

  const messages = messagesQuery.data?.messages ?? [];

  function handleConversationSelect(conversation: Conversation) {
    setSelectedConversationId(conversation.id);
  }

  function handleSendMessage(content: string) {
    if (!selectedConversationId) {
      toast.error("Select a conversation first.");
      return;
    }

    sendMessageMutation.mutate(
      { type: "text", content },
      {
        onError: () => {
          toast.error("Failed to send message. Please try again.");
        },
      },
    );
  }

  function handleDeleteMessage(messageId: string) {
    deleteMessageMutation.mutate(messageId, {
      onSuccess: () => {
        toast.success("Message deleted.");
      },
      onError: () => {
        toast.error("Failed to delete message.");
      },
    });
  }

  async function handleCopyMessage(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Message copied.");
    } catch {
      toast.error("Unable to copy message.");
    }
  }

  function handleHeaderAction(action: "video" | "phone" | "more") {
    const labels = {
      video: "Video call",
      phone: "Voice call",
      more: "Conversation options",
    };

    toast.info(`${labels[action]} is not connected yet.`);
  }

  const isInitialMessagesLoading =
    Boolean(selectedConversationId) && messagesQuery.isLoading;

  return (
    <div className="mt-25 flex h-[calc(100dvh-7rem)] min-h-125 w-full overflow-hidden rounded-lg border border-app-neutral-lighter bg-white shadow-sm">
      <div className="hidden h-full md:flex">
        <ChatSidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          searchValue={searchValue}
          showUnreadOnly={showUnreadOnly}
          onSearchChange={setSearchValue}
          onConversationSelect={handleConversationSelect}
          onToggleUnread={() => setShowUnreadOnly((value) => !value)}
          isLoading={conversationsQuery.isLoading}
        />
      </div>

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          conversation={selectedConversation}
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          searchValue={searchValue}
          showUnreadOnly={showUnreadOnly}
          onSearchChange={setSearchValue}
          onConversationSelect={handleConversationSelect}
          onToggleUnread={() => setShowUnreadOnly((value) => !value)}
          onAction={handleHeaderAction}
        />

        {conversationsQuery.isError ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="text-center">
              <p className="text-sm text-destructive">
                Failed to load conversations.
              </p>
              <button
                type="button"
                onClick={() => void conversationsQuery.refetch()}
                className="mt-2 text-sm text-app-primary underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : !selectedConversation ? (
          <div className="flex flex-1 items-center justify-center p-4 text-center">
            <p className="text-sm text-app-neutral-darker">
              {conversationsQuery.isLoading
                ? "Loading conversations..."
                : "Select a conversation to start chatting."}
            </p>
          </div>
        ) : messagesQuery.isError ? (
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="text-center">
              <p className="text-sm text-destructive">
                Failed to load messages.
              </p>
              <button
                type="button"
                onClick={() => void messagesQuery.refetch()}
                className="mt-2 text-sm text-app-primary underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : isInitialMessagesLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-app-neutral-darker">
              Loading messages...
            </p>
          </div>
        ) : (
          <ChatMessages
            messages={messages}
            otherUserId={selectedConversation.other_user.id}
            onCopy={handleCopyMessage}
            onDelete={handleDeleteMessage}
          />
        )}

        <ChatInput
          onSend={handleSendMessage}
          disabled={
            !selectedConversationId ||
            sendMessageMutation.isPending ||
            conversationsQuery.isError ||
            messagesQuery.isError
          }
        />
      </main>
    </div>
  );
}
