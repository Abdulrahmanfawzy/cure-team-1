import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentApi } from "../services/appointment.services";
import type { ReviewFormValues } from "../schema/appointment";

export default function useCreateReview(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReviewFormValues) =>
      appointmentApi.createReview(bookingId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["doctor-specific-appointment"],
      });
    },
  });
}
