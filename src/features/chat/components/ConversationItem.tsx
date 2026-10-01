import { CheckCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Conversation } from "../types/chat.types";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversation: Conversation) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: ConversationItemProps) {
  const user = conversation.other_user;
  const lastMessage = conversation.last_message;

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  const lastMessageText = lastMessage?.is_deleted_by_sender
    ? "Message deleted"
    : (lastMessage?.content ??
      (lastMessage?.type === "voice" ? "Voice message" : "No messages yet"));

  const time = conversation.last_message_at
    ? new Date(conversation.last_message_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation)}
      className={[
        "flex w-full items-center gap-2.5 border-b border-app-neutral-lightest px-2.5 py-2.5 text-left transition-colors",
        "hover:bg-app-neutral-lightest",
        isActive && "bg-app-neutral-lightest",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Avatar className="size-10 shrink-0">
        <AvatarImage src={user.profile_image} alt={user.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-app-secondary">
            {user.name}
          </p>
          <span className="shrink-0 text-[10px] text-app-neutral-darker">
            {time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            {lastMessage?.status === "seen" ||
            lastMessage?.status === "read" ? (
              <CheckCheck className="size-3 shrink-0 text-app-primary" />
            ) : null}

            <p className="truncate text-xs text-app-neutral-darker">
              {lastMessageText}
            </p>
          </div>

          {conversation.unread_count > 0 && (
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs text-white">
              {conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
