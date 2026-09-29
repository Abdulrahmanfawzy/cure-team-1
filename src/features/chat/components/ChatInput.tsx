import { useRef, useState } from 'react'

import {
  Camera,
  Mic,
  Paperclip,
  Send,
  Square,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputProps {
  onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const attachmentInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = value.trim()

    if (!message) {
      return
    }

    onSend(message)
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 items-center gap-2 border-t border-app-neutral-lighter px-3 py-2"
    >
      <input
        ref={attachmentInputRef}
        type="file"
        className="hidden"
        onChange={() => {
          setValue('Attachment selected')
        }}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        className="hidden"
        onChange={() => {
          setValue('Camera file selected')
        }}
      />

      <div className="relative min-w-0 flex-1">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Message"
          className="h-8 border-0 bg-app-neutral-lightest pr-16 text-4 shadow-none focus-visible:ring-1"
        />

        <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => attachmentInputRef.current?.click()}
            aria-label="Attach file"
            className="size-6 text-app-neutral-darker"
          >
            <Paperclip className="size-6" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => cameraInputRef.current?.click()}
            aria-label="Open camera"
            className="size-6 text-app-neutral-darker"
          >
            <Camera className="size-6" />
          </Button>
        </div>
      </div>

      <Button
        type={isRecording ? 'button' : 'submit'}
        onClick={
          isRecording
            ? () => setIsRecording(false)
            : undefined
        }
        size="icon"
        aria-label={
          isRecording
            ? 'Stop recording'
            : value.trim()
              ? 'Send message'
              : 'Start voice recording'
        }
        className={[
          'size-8 shrink-0 rounded-md',
          isRecording || value.trim()
            ? 'bg-app-primary hover:bg-app-primary'
            : 'bg-app-primary hover:bg-app-primary',
        ].join(' ')}
      >
        {isRecording ? (
          <Square className="size-3 fill-current" />
        ) : value.trim() ? (
          <Send className="size-3.5" />
        ) : (
          <Mic className="size-3.5" />
        )}
      </Button>

      {!value.trim() && !isRecording && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsRecording(true)}
          aria-label="Start voice recording"
          className="hidden"
        >
          <Mic className='size-12' />
        </Button>
      )}
    </form>
  )
}