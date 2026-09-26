import type { DoctorDetail } from '../types/doctor-details.types'
import { AppointmentSection } from './AppointmentSection'
import { DoctorSidebar } from './DoctorSidebar'
import { ReviewsSection } from './ReviewsSection'

interface DoctorDetailsLayoutProps {
  doctor: DoctorDetail
}

export function DoctorDetailsLayout({
  doctor,
}: DoctorDetailsLayoutProps) {
  return (
    <div className="bg-white">
      <div className="main_container py-6 ">
        
       <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,1fr)_300px]">
  <aside className="order-1 lg:order-2">
    <DoctorSidebar doctor={doctor} />
  </aside>

  <main className="order-2 lg:order-1">
    <AppointmentSection />
    <ReviewsSection />
  </main>
</div>
      </div>
    </div>
  )
}