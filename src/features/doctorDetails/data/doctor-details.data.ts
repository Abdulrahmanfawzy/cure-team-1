import type {
  AppointmentDate,
  AppointmentTime,
  DoctorDetail,
  DoctorReview,
} from '../types/doctor-details.types'

export const doctorDetail: DoctorDetail = {
  name: 'Dr. Jessica Turner',
  specialty: 'Pulmonologist',
  image: 'https://i.pravatar.cc/160?img=47',
  patients: '2,000+',
  experience: '10+',
  rating: 4.5,
  reviews: '1,872',
  about:
    'Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and lung conditions.',
  location: '129 El-Nasr Street, Cairo, Egypt',
  reviewsCount: '1250+ Reviews',
}

export const doctorReviews: DoctorReview[] = [
  {
    id: 1,
    patient: 'Nabila Reyna',
    avatar: 'https://i.pravatar.cc/80?img=32',
    time: '30 min ago',
    rating: 4.5,
    comment:
      'Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!',
  },
  {
    id: 2,
    patient: 'Ferry Ichsan A',
    avatar: 'https://i.pravatar.cc/80?img=12',
    time: 'A week ago',
    rating: 4.5,
    comment:
      'Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!',
  },
]

export const appointmentDates: AppointmentDate[] = [
  { day: 'Fri', date: '12' },
  { day: 'Sat', date: '13' },
  { day: 'Sun', date: '14' },
  { day: 'Mon', date: '15', selected: true },
  { day: 'Tue', date: '16' },
  { day: 'Wed', date: '17' },
  { day: 'Thu', date: '18' },
]

export const appointmentTimes: AppointmentTime[] = [
  { label: '9:00 AM' },
  { label: '10:00 AM' },
  { label: '11:00 AM', selected: true },
  { label: '12:30 AM' },
  { label: '5:30 PM' },
  { label: '7:00 PM' },
  { label: '9:00 PM' },
  { label: '10:00 PM' },
]