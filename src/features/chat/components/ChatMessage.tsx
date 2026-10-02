import { useState } from "react";

import {
  Check,
  CheckCheck,
  Copy,
  MoreHorizontal,
  Pause,
  Play,
  SmilePlus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";

import type { ChatMessage as ChatMessageType } from "../types/chat.types";

interface ChatMessageProps {
  message: ChatMessageType;
  isMine: boolean;
  onDelete: (messageId: string) => void;
  onCopy: (content: string) => void;
}

export function ChatMessage({
  message,
  isMine,
  onDelete,
  onCopy,
}: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [reaction, setReaction] = useState(false);

  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isDeleted = isMine
    ? message.is_deleted_by_sender
    : message.is_deleted_by_receiver;

  const statusIcon =
    message.status === "seen" || message.status === "read" ? (
      <CheckCheck className="size-3 text-app-primary" />
    ) : message.status === "delivered" ? (
      <CheckCheck className="size-3" />
    ) : (
      <Check className="size-3" />
    );

  if (isDeleted) {
    return (
      <Message align={isMine ? "end" : "start"} className="px-3 py-1">
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent className="text-xs italic text-muted-foreground">
              This message was deleted
            </BubbleContent>
          </Bubble>
          <MessageFooter>{time}</MessageFooter>
        </MessageContent>
      </Message>
    );
  }

  if (message.type === "voice" && message.media_url) {
    return (
      <Message align={isMine ? "end" : "start"} className="px-3 py-1">
        <MessageContent>
          <Bubble
            variant={isMine ? "default" : "secondary"}
            className="min-w-45 px-2 py-1.5"
          >
            <BubbleContent>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying((value) => !value)}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  className="size-7 shrink-0 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="size-3" />
                  ) : (
                    <Play className="size-3" />
                  )}
                </Button>

                <audio
                  src={message.media_url}
                  controls
                  className="h-8 max-w-45"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            </BubbleContent>
          </Bubble>

          <MessageFooter>
            <span>{time}</span>
            {isMine && statusIcon}
          </MessageFooter>
        </MessageContent>
      </Message>
    );
  }

  const content =
    message.type === "image" || message.type === "video"
      ? message.media_url
      : message.content;

  return (
    <Message align={isMine ? "end" : "start"} className="px-3 py-1">
      <MessageContent>
        <Bubble
          variant={isMine ? "default" : "secondary"}
          className="max-w-[min(75vw,420px)]"
        >
          <BubbleContent className="whitespace-pre-wrap wrap-break-word text-sm leading-5">
            {message.type === "image" && message.media_url ? (
              <img
                src={message.media_url}
                alt="Shared image"
                className="max-h-64 rounded-md object-contain"
              />
            ) : message.type === "video" && message.media_url ? (
              <video
                src={message.media_url}
                controls
                className="max-h-64 max-w-full rounded-md"
              />
            ) : message.type === "file" && message.media_url ? (
              <a
                href={message.media_url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {message.file_name ?? "Download attachment"}
              </a>
            ) : (
              (content ?? "")
            )}
          </BubbleContent>
        </Bubble>

        <MessageFooter className="mt-0.5 gap-1">
          <span>{time}</span>
          {isMine && statusIcon}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Copy message"
            className="size-6"
            onClick={() => {
              if (message.content) onCopy(message.content);
              else toast.info("No text to copy");
            }}
          >
            <Copy className="size-3" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={reaction ? "Remove reaction" : "React to message"}
            className={`size-6 ${reaction ? "text-app-primary" : ""}`}
            onClick={() => setReaction((value) => !value)}
          >
            <SmilePlus className="size-3" />
          </Button>

          {isMine && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Delete message"
              className="size-6 text-destructive"
              onClick={() => onDelete(message.id)}
            >
              <Trash2 className="size-3" />
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="More message options"
            className="size-6"
            onClick={() =>
              toast.info("More message actions can be added here.")
            }
          >
            <MoreHorizontal className="size-3" />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
