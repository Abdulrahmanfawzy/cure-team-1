export interface HomeApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Specialty {
  id: string;
  name: string;
  icone: string;
}

export interface DoctorAvailability {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialist: Specialty;
  about: string;
  experience: string;
  consultation_price: string;
  rating_avg: string;
  rating_count: number;
  profile_image: string;
  availabilities: DoctorAvailability[];
  latitude: number;
  longitude: number;
  gender: string;
  opening_hours: string;
  consultation_type: string;
  hospital: string;
  distance: number | null;
}

export interface ReviewPatient {
  id: string;
  name: string;
  profile_image: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  created_at_human: string;
  patient: ReviewPatient;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type HowItWorksStepType =
  | "search"
  | "calendar"
  | "booking";

export interface HowItWorksStep {
  id: number;
  type: HowItWorksStepType;
  title: string;
  description: string;
  image: string;
}