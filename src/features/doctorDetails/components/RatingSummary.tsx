import { Star } from 'lucide-react'
import type { DoctorDetail } from '../types/doctor-details.types'

interface RatingSummaryProps {
  doctor: DoctorDetail
}

export function RatingSummary({
  doctor,
}: RatingSummaryProps) {
  return (
    <div className="h-12 mb-11.5 rounded-md bg-white px-2 py-1.5">
      <div className="flex items-end justify-between gap-3">
        <span className="text-[40px] font-medium text-app-secondary">
          {doctor.rating.toFixed(1)}/5
        </span>

        <div className="text-right">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                className={
                  index < Math.round(doctor.rating)
                    ? 'fill-app-gold text-app-gold'
                    : 'text-app-neutral-lighter'
                }
              />
            ))}
          </div>

          <p className="mt-1 text-[16px] text-app-neutral-darker">
            {doctor.reviewsCount}
          </p>
        </div>
      </div>
    </div>
  )
}