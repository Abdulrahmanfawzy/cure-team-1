import { Clock3, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

export interface DoctorCardData {
  id: string
  name: string
  specialty: string
  hospital: string
  rating: number
  availableTime: string
  price: number | string
  image: string
}

interface DoctorCardProps {
  doctor: DoctorCardData
  className?: string
  compact?: boolean
}

export function DoctorCard({
  doctor,
  className = '',
  compact = false,
}: DoctorCardProps) {
  return (
    <Card
      className={[
        'overflow-hidden border-app-neutral-lightest bg-white shadow-sm',
        compact ? 'rounded-xl' : 'rounded-md',
        className,
      ].join(' ')}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <img
            src={doctor.image}
            alt={doctor.name}
            className={[
              'shrink-0 rounded-xl object-cover',
              compact
                ? 'h-20 w-20'
                : 'h-22 w-24.5',
            ].join(' ')}
            onError={(event) => {
              event.currentTarget.src =
                '/images/avatar.png'
            }}
          />

          <div className="min-w-0 flex-1">
            <h3
              className={[
                'truncate font-medium text-app-secondary',
                compact
                  ? 'text-[11px]'
                  : 'font-noto-serif-georgian text-[16px]',
              ].join(' ')}
            >
              {doctor.name}
            </h3>

            <p
              className={[
                'truncate text-app-neutral-darker',
                compact
                  ? 'text-[11px]'
                  : 'mt-1 text-sm',
              ].join(' ')}
            >
              {doctor.specialty}
              {doctor.hospital
                ? ` | ${doctor.hospital}`
                : ''}
            </p>

            <div
              className={[
                'flex items-center',
                compact
                  ? 'mt-1 gap-1 text-[8px]'
                  : 'mt-2 gap-3 text-sm',
              ].join(' ')}
            >
              <span className="flex items-center gap-1">
                <Star
                  size={compact ? 11 : 17}
                  fill="currentColor"
                  className="text-app-gold"
                />

                <span>
                  {doctor.rating.toFixed(1)}
                </span>
              </span>

              <span className="flex min-w-0 items-center gap-1">
                <Clock3
                  size={compact ? 10 : 16}
                  className="text-app-neutral-darker"
                />

                <span className="truncate">
                  {doctor.availableTime}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          className={[
            'flex items-center justify-between',
            compact
              ? 'mt-3 text-[10px]'
              : 'my-2 border-t border-app-neutral-lightest pt-2 text-sm',
          ].join(' ')}
        >
          <span
            className={
              compact
                ? 'text-app-neutral-darker'
                : 'text-app-secondary'
            }
          >
            {compact
              ? 'Consultation'
              : 'Price/hour'}
          </span>

          <span className="text-app-error">
            {typeof doctor.price === 'number'
              ? `$${doctor.price.toFixed(2)}`
              : doctor.price}
          </span>
        </div>

        <Button
          asChild
          className={
            compact
              ? 'mt-2 h-8 w-full rounded-md text-[10px]'
              : 'mt-2 h-12 w-full rounded-lg'
          }
        >
          <Link
            to={`/appointment?doctorId=${doctor.id}`}
          >
            Book appointment
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}