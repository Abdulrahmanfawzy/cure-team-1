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
    <div className="h-89 flex flex-col rounded-xl border border-app-neutral-lighter bg-white p-4
     mb-8 gap-y-6">
      <div className="flex items-center justify-between border-b border-app-neutral-lightest pb-3">
        <span className="text-[16px] font-medium text-app-neutral-darker">
          Choose date and time
        </span>

        <Button
          variant="ghost"
          className="h-7 gap-1 px-1 text-[16px] font-normal text-app-neutral-darker"
        >
          <CalendarDays size={14} />

          November, 2024

          <ChevronDown size={12} />
        </Button>
      </div>

      <div className="mt-3 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-6 shrink-0"
          aria-label="Previous dates"
        >
          <ChevronLeft size={13} />
        </Button>

        <div className="grid flex-1 grid-cols-7 gap-1">
          {appointmentDates.map((date) => (
            <button
              key={`${date.day}-${date.date}`}
              type="button"
              className={`flex h-12.5 w-14.5 flex-col items-center justify-center rounded-md 
                text-[9px] ${
                date.selected
                  ? 'bg-app-primary text-white'
                  : 'bg-app-neutral-lightest text-app-neutral-darker'
              }`}
            >
              <span className='text[16px]'>{date.day}</span>

              <span className="font-medium text-[16px]">
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

      <div className="mt-3 grid grid-cols-6 gap-2">
        {appointmentTimes.map((time) => (
          <TimeSlot
            key={time.label}
            label={time.label}
            selected={time.selected}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-app-neutral-lightest pt-3">
        <span className="text-[16px] text-app-secondary">
          Monday, November 15 - 11:00 AM
        </span>

        <Button
          variant="outline"
          className="h-7 border-app-primary px-4 text-[10px] text-app-primary"
        >
          Book
        </Button>
      </div>
    </div>
  )
}