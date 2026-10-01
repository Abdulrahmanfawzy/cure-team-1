import { useMutation } from "@tanstack/react-query";
import type { CancelPayload } from "../types/book.types";
import { bookApi } from "../services/book.services";


export default function useCancelBooking() {
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: CancelPayload;
    }) => bookApi.cancelBooking(bookingId, payload),
  });
}