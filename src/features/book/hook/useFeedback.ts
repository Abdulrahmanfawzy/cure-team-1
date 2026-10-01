import { useMutation } from "@tanstack/react-query";
import { bookApi } from "../services/book.services";
import type { FeedbackPayload } from "../types/book.types";

export default function useFeedback() {
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: FeedbackPayload;
    }) => bookApi.sendFeedback(bookingId, payload),
  });
}
