import { apiClient } from "@/services/axios/client";
import type {
  BookAgainPayload,
  CancelPayload,
  FeedbackPayload,
  ReschedulePayload,
  ResponseBook,
  SpecificAppointment,
  SupportPayload,
} from "../types/book.types";

export const bookApi = {
  getAllBook: async () => {
    const response = await apiClient.get<ResponseBook>(`/booking`);
    return response.data;
  },

  getSpecificBook: async (id: string) => {
    const response = await apiClient.get<SpecificAppointment>(`/booking/${id}`);
    return response.data;
  },

  rescheduleBooking: async (bookingId: string, payload: ReschedulePayload) => {
    const { data } = await apiClient.post(
      `/booking/${bookingId}/reschedule`,
      payload,
    );

    return data;
  },

  bookAgain: async (bookingId: string, payload: BookAgainPayload) => {
    const { data } = await apiClient.post(
      `/booking/${bookingId}/again`,
      payload,
    );

    return data;
  },
  cancelBooking: async (bookingId: string, payload: CancelPayload) => {
    const { data } = await apiClient.post(
      `/booking/${bookingId}/cancel`,
      payload,
    );

    return data;
  },

  sendSupport: async (bookingId: string, payload: SupportPayload) => {
    const { data } = await apiClient.post(
      `/booking/${bookingId}/support`,
      payload,
    );

    return data;
  },

  sendFeedback: async (bookingId: string, payload: FeedbackPayload) => {
    const { data } = await apiClient.post(
      `/booking/${bookingId}/feedback`,
      payload,
    );

    return data;
  },
};
