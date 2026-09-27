import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  appointmentDates,
  appointmentTimes,
} from '../data/doctor-details.data'
import { TimeSlot } from './TimeSlot'

export function AppointmentCalendar() {
  return (
    <div
      className="
        mb-8 flex flex-col gap-y-4
        rounded-xl border border-app-neutral-lighter bg-white p-3
        sm:gap-y-5 sm:p-4
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          border-b border-app-neutral-lightest pb-3
        "
      >
        <span className="text-sm font-medium text-app-neutral-darker sm:text-base">
          Choose date and time
        </span>

        <Button
          variant="ghost"
          className="
            h-7 gap-1 px-1
            text-xs font-normal text-app-neutral-darker
            sm:text-sm
          "
        >
          <CalendarDays size={14} />

          <span>November, 2024</span>

          <ChevronDown size={12} />
        </Button>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-6 shrink-0"
          aria-label="Previous dates"
        >
          <ChevronLeft size={13} />
        </Button>

        <div className="grid min-w-0 flex-1 grid-cols-7 gap-1">
          {appointmentDates.map((date) => (
            <button
              key={`${date.day}-${date.date}`}
              type="button"
              className={`
                flex h-12 min-w-0 flex-col items-center justify-center
                rounded-md text-xs
                sm:h-12.5
                ${
                  date.selected
                    ? 'bg-app-primary text-white'
                    : 'bg-app-neutral-lightest text-app-neutral-darker'
                }
              `}
            >
              <span className="text-xs">
                {date.day}
              </span>

              <span className="font-medium text-sm">
                {date.date}
              </span>
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-6 shrink-0"
          aria-label="Next dates"
        >
          <ChevronRight size={13} />
        </Button>
      </div>

      {/* Time slots */}
      <div
        className="
          grid grid-cols-3 gap-2
          sm:grid-cols-4
          md:grid-cols-6
        "
      >
        {appointmentTimes.map((time) => (
          <TimeSlot
            key={time.label}
            label={time.label}
            selected={time.selected}
          />
        ))}
      </div>

      {/* Selected appointment */}
      <div
        className="
          flex flex-col gap-3
          border-t border-app-neutral-lightest pt-3
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <span className="text-sm text-app-secondary sm:text-base">
          Monday, November 15 - 11:00 AM
        </span>

        <Button
          variant="outline"
          className="
            h-8 w-full border-app-primary
            px-4 text-xs text-app-primary
            sm:w-auto
          "
        >
          Book
        </Button>
      </div>
    </div>
  )
}