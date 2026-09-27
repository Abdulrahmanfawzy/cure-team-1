import type { ButtonHTMLAttributes } from 'react'

interface TimeSlotProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  selected?: boolean
}

export function TimeSlot({
  label,
  selected = false,
  ...props
}: TimeSlotProps) {
  return (
    <button
      type="button"
      {...props}
      className={`h-8 rounded-md px-3 text-[14px] transition-colors ${
        selected
          ? 'bg-app-primary text-white'
          : 'bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-primary-lightest'
      } ${props.className ?? ''}`}
    >
      {label}
    </button>
  )
}