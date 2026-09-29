import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppointmentCalendar } from './AppointmentCalendar'

export function AppointmentSection() {
  return (
    <section  >
      <Button
        variant="link"
        className="h-auto gap-1 p-0 text-[20px] text-app-secondary"
      >
        <ArrowLeft size={13} />
        Make an appointment
      </Button>

      <div className="mt-4">
        <AppointmentCalendar />
      </div>
    </section>
  )
}