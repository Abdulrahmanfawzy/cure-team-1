import { MoreVertical, Phone, Video, PanelLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { Conversation } from "../types/chat.types";
import { ChatSidebar } from "./ChatSidebar";

interface ChatHeaderProps {
  conversation: Conversation | null;
  conversations: Conversation[];
  selectedConversationId: string | null;
  searchValue: string;
  showUnreadOnly: boolean;
  onSearchChange: (value: string) => void;
  onConversationSelect: (conversation: Conversation) => void;
  onToggleUnread: () => void;
  onAction: (action: "video" | "phone" | "more") => void;
}

export function ChatHeader({
  conversation,
  conversations,
  selectedConversationId,
  searchValue,
  showUnreadOnly,
  onSearchChange,
  onConversationSelect,
  onToggleUnread,
  onAction,
}: ChatHeaderProps) {
  const user = conversation?.other_user;
  const initials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-app-neutral-lighter px-3">
      <div className="flex min-w-0 items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 md:hidden"
              aria-label="Open conversations"
            >
              <PanelLeft className="size-4" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-75 p-0 sm:w-85">
            <SheetHeader className="sr-only">
              <SheetTitle>Conversations</SheetTitle>
            </SheetHeader>

            <ChatSidebar
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              searchValue={searchValue}
              showUnreadOnly={showUnreadOnly}
              onSearchChange={onSearchChange}
              onConversationSelect={onConversationSelect}
              onToggleUnread={onToggleUnread}
            />
          </SheetContent>
        </Sheet>

        {user ? (
          <>
            <Avatar className="size-8 shrink-0">
              <AvatarImage src={user.profile_image} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-app-secondary">
                {user.name}
              </p>
              <p className="text-[10px] text-app-neutral-darker">
                {user.role === "doctor" ? "Doctor" : "Patient"}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-app-neutral-darker">
            Select a conversation
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction("video")}
          aria-label="Start video call"
        >
          <Video className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction("phone")}
          aria-label="Start voice call"
        >
          <Phone className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onAction("more")}
          aria-label="More conversation options"
        >
          <MoreVertical className="size-4" />
        </Button>
      </div>
    </header>
  );
}
