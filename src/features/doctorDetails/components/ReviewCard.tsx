import { Star } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import type { DoctorReview } from '../types/doctor-details.types'

interface ReviewCardProps {
  review: DoctorReview
}

export function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="rounded-lg border border-app-neutral-lighter w-95.25 h-43.75">
      <div className="flex items-start gap-2 px-3 py-3.5">
        <Avatar className="size-16">
          <AvatarImage
            src={review.avatar}
            alt={review.patient}
          />

          <AvatarFallback>
            {review.patient.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-y-2.5">
            <div>
              <p className="text-[16px] font-medium text-app-secondary">
                {review.patient}
              </p>

              <p className="text-[14px] text-app-neutral-darker">
                {review.time}
              </p>
            </div>

            <span className="inline-flex items-center gap-0.5 text-[16px] font-medium 
            text-app-gold">
              <Star
                size={16}
                className="fill-app-gold"
              />

              {review.rating}
            </span>
          </div>

          <p className="mt-2 text-[15px]  leading-4 text-app-neutral-darker">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  )
}