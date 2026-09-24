export type Gender = 'Male' | 'Female'

export type ConsultationType = 'In-clinic' | 'Home Visit'

export interface Doctor {
  id: number
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
  id: number
  name: string
}