import axios from 'axios'
import { apiClient } from '@/services/axios'
import type {
  Doctor,
  DoctorApiResponse,
  DoctorSearchFilters,
  DoctorsSearchResponse,
} from '../types/doctor.types'

const buildSearchParams = (
  filters: DoctorSearchFilters,
): URLSearchParams => {
  const params = new URLSearchParams()

  if (filters.search.trim()) {
    params.set('search', filters.search.trim())
  }

  if (filters.major) {
    params.set('major', filters.major)
  }

  if (filters.gender) {
    params.set('gender', filters.gender)
  }

  if (filters.consultationType) {
    params.set('consultation_type', filters.consultationType)
  }

  if (filters.availableDate) {
    params.set('available_data', filters.availableDate)
  }

  if (filters.sort) {
    params.set('sort', filters.sort)
  }

  params.set('page', String(filters.page))

  return params
}

const getImageUrl = (imagePath: string): string => {
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath
  }

  const baseUrl = apiClient.defaults.baseURL ?? ''

  const origin = baseUrl
    .replace(/\/api\/?$/, '')
    .replace(/\/$/, '')

  return `${origin}/${imagePath.replace(/^\//, '')}`
}

const getAvailableTime = (
  doctor: DoctorApiResponse,
): string => {
  const availability = doctor.availabilities.find(
    (slot) => !slot.is_booked,
  )

  if (!availability) {
    return 'Unavailable'
  }

  return `${availability.start_time} - ${availability.end_time}`
}

const getDateString = (date: Date): string => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

const mapDoctor = (doctor: DoctorApiResponse): Doctor => {
  const today = getDateString(new Date())

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)

  const tomorrow = getDateString(tomorrowDate)

  return {
    id: doctor.id,
    name: doctor.name,

    specialty: doctor.specialist.name,

    hospital: doctor.hospital.trim(),

    rating: Number(doctor.rating_avg),

    availableTime: getAvailableTime(doctor),

    price: Number(doctor.consultation_price),

    gender: doctor.gender,

    consultationTypes: [doctor.consultation_type],

    availableToday: doctor.availabilities.some(
      (slot) =>
        slot.date === today &&
        !slot.is_booked,
    ),

    availableTomorrow: doctor.availabilities.some(
      (slot) =>
        slot.date === tomorrow &&
        !slot.is_booked,
    ),

    image: getImageUrl(doctor.profile_image),
  }
}

export interface DoctorsQueryResult {
  doctors: Doctor[]
  pagination: DoctorsSearchResponse['pagination']
  message: string
}

export const searchDoctors = async (
  filters: DoctorSearchFilters,
): Promise<DoctorsQueryResult> => {
  try {
    const { data } =
      await apiClient.get<DoctorsSearchResponse>(
        '/search',
        {
          params: buildSearchParams(filters),
        },
      )

    return {
      doctors: data.data.map(mapDoctor),
      pagination: data.pagination,
      message: data.message,
    }
  } catch (error) {
   
    if (
      axios.isAxiosError<{ message?: string }>(error) &&
      error.response?.status === 404
    ) {
      return {
        doctors: [],

        pagination: {
          current_page: filters.page,
          per_page: 10,
          total: 0,
          last_page: 1,
          from: null,
          to: null,
        },

        message:
          error.response.data?.message ??
          "We couldn't find what you're looking for.",
      }
    }

    throw error
  }
}