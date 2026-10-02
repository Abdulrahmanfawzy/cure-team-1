import { useRef, useState } from "react";

import { Camera, Mic, Paperclip, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const attachmentRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = value.trim();
    if (!content || disabled) return;

    onSend(content);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 items-center gap-2 border-t border-app-neutral-lighter px-3 py-2"
    >
      <input
        ref={attachmentRef}
        type="file"
        className="hidden"
        onChange={() => undefined}
      />

      <input
        ref={cameraRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={() => undefined}
      />

      <div className="relative min-w-0 flex-1">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Message"
          disabled={disabled}
          className="h-9 border-0 bg-app-neutral-lightest pr-16 shadow-none focus-visible:ring-1"
        />

        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Attach file"
            onClick={() => attachmentRef.current?.click()}
            className="size-7"
          >
            <Paperclip className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open camera"
            onClick={() => cameraRef.current?.click()}
            className="size-7"
          >
            <Camera className="size-4" />
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        size="icon"
        aria-label="Send message"
        disabled={disabled || !value.trim()}
        className="size-9 shrink-0"
      >
        {value.trim() ? (
          <Send className="size-4" />
        ) : (
          <Mic className="size-4" />
        )}
      </Button>
    </form>
  );
}
