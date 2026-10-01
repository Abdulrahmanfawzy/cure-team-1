import { apiClient } from "@/services/axios/client";
import type {
  DoctorTypeResponse,
  ResponseCreateBook,
} from "../types/appointment.type";
import type {
  CreateBookAppointmentInput,
  ReviewFormValues,
} from "../schema/appointment";

export const appointmentApi = {
  getDoctorSpecificAppointment: async (doctorId: string) => {
    const response = await apiClient.get<DoctorTypeResponse>(
      `/doctor/${doctorId}`,
    );
    return response.data;
  },

  createBook: async (data: CreateBookAppointmentInput) => {
    const response = await apiClient.post<ResponseCreateBook>(
      "/bookings",
      data,
    );
    return response.data;
  },
  createReview: async (bookingId: string, data: ReviewFormValues) => {
    const response = await apiClient.post(
      `/booking/${bookingId}/feedback`,
      data,
    );
    return response.data;
  },
};
