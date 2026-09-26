import { doctorDetail } from '../data/doctor-details.data'
import { DoctorDetailsLayout } from './DoctorDetailsLayout'

export function DoctorDetails() {
  return <DoctorDetailsLayout doctor={doctorDetail} />
}