import { MapPin } from 'lucide-react'
import type { DoctorDetail } from '../types/doctor-details.types'

interface LocationCardProps {
  doctor: DoctorDetail
}

export function LocationCard({
  doctor,
}: LocationCardProps) {
  return (
    <section className="mt-5">
      <h3 className="text-[20px] font-medium text-app-secondary">
        Location
      </h3>

      <div className="relative mt-2 h-28 overflow-hidden rounded-md border border-app-neutral-lighter bg-[#efe4bd]">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(28deg,transparent_0_35%,#d8b76c_35%_36%,transparent_36%_60%,#d8b76c_60%_61%,transparent_61%),linear-gradient(115deg,transparent_0_48%,#c7d9b4_48%_53%,transparent_53%)]" />

        <div className="absolute left-[42%] top-[45%] flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-white shadow">
          <MapPin size={12} />
        </div>

        <span className="absolute bottom-1 left-1 max-w-[90%] truncate rounded bg-white/90 px-1.5 py-0.5 text-[8px] text-app-neutral-darker">
          {doctor.location}
        </span>
      </div>
    </section>
  )
}