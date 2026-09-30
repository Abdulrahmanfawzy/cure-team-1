import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentApi } from "../services/appointment.services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useCreateBook() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appointmentApi.createBook,
    onSuccess(data, variables) {
      toast.success("Appointment booked successfully");
      queryClient.invalidateQueries({
        queryKey: ["doctor-specific-appointment"],
      });
      // redirect to payment page
      navigate(`/payment/${data.data.id}`);
    },
    onError() {
      toast.error("Appointment failed");
    },
  });
}
