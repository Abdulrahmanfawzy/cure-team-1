import { useState } from "react";

import { CheckCheck, Copy, Play, SmilePlus, Pause } from "lucide-react";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import { Button } from "@/components/ui/button";

import type { ChatMessage as ChatMessageType } from "../types/chat.types";

interface ChatMessageProps {
  message: ChatMessageType;
  onCopy: (content: string) => void;
}

export function ChatMessage({ message, onCopy }: ChatMessageProps) {
  const isMine = message.sender === "me";
  const [isPlaying, setIsPlaying] = useState(false);
  const [reaction, setReaction] = useState(false);

  if (message.type === "voice") {
    return (
      <Message align={isMine ? "end" : "start"} className="px-3 py-1">
        <MessageContent>
          <Bubble
            variant={isMine ? "default" : "secondary"}
            className="min-w-37.5 px-2 py-1.5"
          >
            <BubbleContent>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying((current) => !current)}
                  aria-label={
                    isPlaying ? "Pause voice message" : "Play voice message"
                  }
                  className="size-6 shrink-0 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="size-3" />
                  ) : (
                    <Play className="size-3 fill-current" />
                  )}
                </Button>

                <div className="flex flex-1 items-center gap-0.5">
                  {Array.from({ length: 26 }).map((_, index) => (
                    <span
                      key={index}
                      className={[
                        "w-0.5 rounded-full",
                        isMine ? "bg-white/80" : "bg-app-neutral-darker",
                      ].join(" ")}
                      style={{
                        height: `${5 + ((index * 7) % 10)}px`,
                      }}
                    />
                  ))}
                </div>

                <span
                  className={
                    isMine
                      ? "text-[8px] text-white/80"
                      : "text-[8px] text-app-neutral-darker"
                  }
                >
                  {message.duration}
                </span>
              </div>
            </BubbleContent>
          </Bubble>

          <MessageFooter className="mt-0.5">
            <span>{message.time}</span>

            {isMine && <CheckCheck className="size-2.5 text-app-primary" />}
          </MessageFooter>
        </MessageContent>
      </Message>
    );
  }

  return (
    <Message align={isMine ? "end" : "start"} className="px-3 py-1">
      <MessageContent>
        <Bubble
          variant={isMine ? "default" : "secondary"}
          className="max-w-[min(75vw,360px)]"
        >
          <BubbleContent className="whitespace-pre-line text-[16px] leading-4">
            {message.content}
          </BubbleContent>
        </Bubble>

        <MessageFooter className="mt-0.5 gap-1">
          <span>{message.time}</span>

          {isMine && <CheckCheck className="size-2.5 text-app-primary" />}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onCopy(message.content ?? "")}
            aria-label="Copy message"
            className="size-4"
          >
            <Copy className="size-2.5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setReaction((current) => !current)}
            aria-label={reaction ? "Remove reaction" : "React to message"}
            className={["size-4", reaction && "text-app-primary"]
              .filter(Boolean)
              .join(" ")}
          >
            <SmilePlus className="size-2.5" />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
