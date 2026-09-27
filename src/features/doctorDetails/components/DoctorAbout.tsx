import type { DoctorDetail } from '../types/doctor-details.types'

interface DoctorAboutProps {
  doctor: DoctorDetail
}

export function DoctorAbout({
  doctor,
}: DoctorAboutProps) {
  return (
    <section className="mt-5">
      <h3 className="text-[20px] font-medium text-app-secondary">
        About me
      </h3>

      <p className="mt-2 text-[14px] leading-4 text-app-neutral-darker">
        {doctor.about}
      </p>
    </section>
  )
}