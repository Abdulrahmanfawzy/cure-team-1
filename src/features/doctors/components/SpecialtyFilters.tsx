import {
  Brain,
  Eye,
  HeartPulse,
  Stethoscope,
  Syringe,
  Waves,
} from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import type { Specialty } from '../types/doctor.types'

interface SpecialtyFilterProps {
  specialties: Specialty[]
  selected: string | null
  onSelect: (
    id: string | null,
  ) => void
}

const icons = [
  Stethoscope,
  HeartPulse,
  Waves,
  Brain,
  Stethoscope,
  Eye,
  Syringe,
]

export function SpecialtyFilters({
  specialties,
  selected,
  onSelect,
}: SpecialtyFilterProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {specialties.map(
          (specialty, index) => {
            const Icon =
              icons[index % icons.length]

            const isSelected =
              selected === specialty.id

            return (
              <CarouselItem
                key={specialty.id}
                className="basis-auto"
              >
                <button
                  type="button"
                  onClick={() =>
                    onSelect(
                      isSelected
                        ? null
                        : specialty.id,
                    )
                  }
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg border px-5 py-3 ${
                    isSelected
                      ? 'border-app-primary bg-app-primary text-white'
                      : 'border-app-neutral-lighter bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />

                  <span>
                    {specialty.name}
                  </span>
                </button>
              </CarouselItem>
            )
          },
        )}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  )
}