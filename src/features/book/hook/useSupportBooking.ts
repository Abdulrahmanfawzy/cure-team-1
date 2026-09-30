import { useMutation } from "@tanstack/react-query";
import { bookApi } from "../services/book.services";
import type { SupportPayload } from "../types/book.types";
import { toast } from "sonner";

export default function useSupportBooking() {
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: SupportPayload;
    }) => bookApi.sendSupport(bookingId, payload),
    onSuccess(data) {
      toast.success(data?.data?.message);
    },
  });
}
