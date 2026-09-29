export type Gender = 'male' | 'female'

export type ConsultationType = 'In-clinic' | 'Home-Visit'

export type AvailabilityDate = 'today' | 'tomorrow'

export type DoctorSort =
  | 'most_recommended'
  | 'price_low_to_high'
  | 'price_high_to_low'

export interface DoctorAvailability {
  id: string
  date: string
  start_time: string
  end_time: string
  is_booked: boolean
}

export interface DoctorSpecialist {
  id: string
  name: string
  icone: string
}

export interface DoctorApiResponse {
  id: string
  name: string
  specialist: DoctorSpecialist
  about: string
  experience: string
  consultation_price: string
  rating_avg: string
  rating_count: number
  profile_image: string
  availabilities: DoctorAvailability[]
  latitude: number
  gender: Gender
  longitude: number
  opening_hours: string
  consultation_type: ConsultationType
  hospital: string
  distance: number | null
}

export interface DoctorsPagination {
  current_page: number
  per_page: number
  total: number
  last_page: number
  from: number | null
  to: number | null
}

export interface DoctorsSearchResponse {
  message: string
  data: DoctorApiResponse[]
  pagination: DoctorsPagination
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  hospital: string
  rating: number
  availableTime: string
  price: number
  gender: Gender
  consultationTypes: ConsultationType[]
  availableToday: boolean
  availableTomorrow: boolean
  image: string
}

export interface Specialty {
  id: string
  name: string
}

export interface DoctorSearchFilters {
  search: string
  major: string | null
  gender: Gender | null
  consultationType: ConsultationType | null
  availableDate: AvailabilityDate | null
  sort: DoctorSort
  page: number
}