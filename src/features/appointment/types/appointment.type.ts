export interface DoctorTypeResponse {
  data: DoctorData;
}

export interface DoctorData {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  gender: string;
  specialist: {
    id: string;
    name: string;
  };
  about: string;
  experience: number;
  education: string;
  certificates: string;
  languages: string[];
  consultation_price: number;
  rating_avg: number;
  ratings_count: number;
  reviews_count: number;
  patients_count: number;
  opening_hours: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: null;
  is_favorite: boolean;
  available_slots: AvailabeSlots[];
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  created_at_human: string;
  patient: {
    id: string;
    name: string;
    profile_image: string;
  };
}

export interface AvailabeSlots {
  date: string;
  slots: {
    id: string;
    start_time: string;
    end_time: string;
    is_booked: boolean;
  }[];
}

export interface ErrorResponse {
  message: string;
}

export interface ResponseCreateReview {
  data: {
    comment: string;
    rating: string;
  };
}


// ResponseCreateBook
export interface ResponseCreateBook {
   data: {
    id: string;
    patient_id: string;
    doctor: {
        id: string;
        name: string;
        specialist: string;
        profile_image: string;
    };
    slot: {
        id: string;
        date: string;
        start_time: string;
        end_time: string;
    };
    consultation_type: string;
    date: string;
    time: string;
    status: string;
    price: number;
    payment_status: string;
    created_at: string;
}
message: string
}
