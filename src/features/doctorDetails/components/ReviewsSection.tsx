import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  doctorDetail,
  doctorReviews,
} from '../data/doctor-details.data'
import { RatingSummary } from './RatingSummary'
import { ReviewCard } from './ReviewCard'

export function ReviewsSection() {
  return (
    <section className="mt-4 mb-11">
      <div className="flex items-center justify-between mb-11">
        <h2 className="text-xs font-medium text-app-secondary">
          Reviews and Rating
        </h2>

        <Button
          variant="link"
          className="h-auto gap-1 p-0 text-[9px] text-app-primary"
        >
          <Pencil size={10} />
          Add review
        </Button>
      </div>

      <div className="mt-2">
        <RatingSummary doctor={doctorDetail} />
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {doctorReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </section>
  )
}