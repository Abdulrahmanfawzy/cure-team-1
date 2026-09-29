export interface ResponseSpecificDoctor {
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
  experience: string;
  consultation_price: string;
  rating_avg: number;
  reviews_count: number;
  patients_count: number;
  opening_hours: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: string | null;
  is_favorite: boolean;
  available_slots: Available_slot[];
  reviews: Review[]
}
export interface Available_slot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface Review {
  id: string,
  rating: number,
  comment: string,
  created_at: string,
  created_at_human: string,
  patient: {
    id: string
    name: string,
    profile_image: string
  }
}