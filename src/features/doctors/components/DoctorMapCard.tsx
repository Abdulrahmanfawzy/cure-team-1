import { DoctorCard } from '@/components/shared'

import type { Doctor } from '../types/doctor.types'

interface DoctorMapCardProps {
  doctor: Doctor
}

export function DoctorMapCard({
  doctor,
}: DoctorMapCardProps) {
  return (
    <DoctorCard
      className="w-64 border-0 shadow-lg"
      doctor={{
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        hospital: doctor.hospital,
        rating: doctor.rating,
        availableTime: doctor.availableTime,
        price: doctor.price,
        image: doctor.image,
      }}
    />
  )
}