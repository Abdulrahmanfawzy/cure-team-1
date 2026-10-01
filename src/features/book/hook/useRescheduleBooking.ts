import { useMutation } from "@tanstack/react-query";
import { bookApi } from "../services/book.services";
import type { ReschedulePayload } from "../types/book.types";

export default function useRescheduleBooking() {
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: ReschedulePayload;
    }) => bookApi.rescheduleBooking(bookingId, payload),
  });
}
