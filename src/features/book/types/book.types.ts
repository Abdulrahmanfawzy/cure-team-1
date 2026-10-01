export interface ResponseBook {
  message: string;
  data: Appointment[];
}

export interface Appointment {
  id: string;
  patient_id: string;
  time: string;
  date: string;
  doctor: DoctorBook;
  status: "upcoming" | "completed" | "canceled" | "pending";
}

export interface DoctorBook {
  doctor_id: string;
  doctor_name: string;
  doctor_image: string;
  specialist: string;
  latitude: number;
  longitude: number;
}

export interface SpecificAppointment {
  message: string;
  data: SpecificAppointmentData;
}

export interface SpecificAppointmentData {
  id: string;
  time: string;
  date: string;
  doctor: DoctorBookAppointemetn;
  availabilities: Availability[];
}

interface Availability {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface DoctorBookAppointemetn {
  id: string;
  name: string;
  specialist: string;
  image: string;
  lat: number;
  long: number;
}

// actions

export interface ReschedulePayload {
  slot_id: string;
}

export interface BookAgainPayload {
  slot_id: string;
}

export interface CancelPayload {
  cancel_reason: string;
}

export interface SupportPayload {
  message: string;
  subject: string;
}

export interface FeedbackPayload {
  comment: string;
  rating: string;
}
