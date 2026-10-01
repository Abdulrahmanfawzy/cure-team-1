import { useMutation } from "@tanstack/react-query";
import type { BookAgainPayload } from "../types/book.types";
import { bookApi } from "../services/book.services";


export default function useBookAgain() {
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: BookAgainPayload;
    }) => bookApi.bookAgain(bookingId, payload),
  });
}