import { Card, CardContent } from '@/components/ui/card'
import type { DoctorDetail } from '../types/doctor-details.types'
import { DoctorAbout } from './DoctorAbout'
import { DoctorProfileHeader } from './DoctorProfileHeader'
import { DoctorStats } from './DoctorStats'
import { LocationCard } from './LocationCard'

interface DoctorSidebarProps {
  doctor: DoctorDetail
}

export function DoctorSidebar({
  doctor,
}: DoctorSidebarProps) {
  return (
    <Card className="bg-app-neutral-lightest shadow-none h-188.25 px-4 pb-6 pt-8 ">
      <CardContent className="flex flex-col gap-y-8 h-full   ">
        <DoctorProfileHeader doctor={doctor} />

        <DoctorStats doctor={doctor} />

        <DoctorAbout doctor={doctor} />

        <LocationCard doctor={doctor} />
      </CardContent>
    </Card>
  )
}