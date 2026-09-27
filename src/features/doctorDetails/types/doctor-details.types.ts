export interface DoctorDetail {
  name: string
  specialty: string
  image: string
  patients: string
  experience: string
  rating: number
  reviews: string
  about: string
  location: string
  reviewsCount: string
}

export interface DoctorReview {
  id: number
  patient: string
  avatar: string
  time: string
  rating: number
  comment: string
}

export interface AppointmentDate {
  day: string
  date: string
  selected?: boolean
}

export interface AppointmentTime {
  label: string
  selected?: boolean
}