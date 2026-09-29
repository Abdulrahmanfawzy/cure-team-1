import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface ConversationSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ConversationSearch({
  value,
  onChange,
}: ConversationSearchProps) {
  return (
    <div className="px-2.5 py-2">
      <div className="relative">
        <Search className="absolute top-1/2 left-2.5 size-5 -translate-y-1/2 text-app-neutral-darker" />

        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search for chat, doctor"
          className="h-12 border-0 bg-app-neutral-lightest pl-8 text-[9px] shadow-none 
          focus-visible:ring-1"
        />
      </div>
    </div>
  )
}