import type { Doctor } from '../types/doctor.types'
import { DoctorCard } from '@/components/shared'

interface DoctorListProps {
  doctors: Doctor[]
  emptyMessage?: string
  isLoading?: boolean
}

export function DoctorList({
  doctors,
  emptyMessage = 'No doctors found.',
  isLoading = false,
}: DoctorListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center text-sm text-app-neutral-darker">
        Loading doctors...
      </div>
    )
  }

  if (!doctors.length) {
    return (
      <div className="flex min-h-75 items-center justify-center whitespace-pre-line text-center text-sm text-app-neutral-darker">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
        />
      ))}
    </div>
  )
}