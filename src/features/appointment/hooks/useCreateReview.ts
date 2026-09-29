import { useMutation } from "@tanstack/react-query"
import { appointmentApi } from "../services/appointment.service"
import type { ReviewFormValues } from "../Schemas/reviewSchema";
import toast from "react-hot-toast";

export default function useCreateReview(id: string) {
    return useMutation({
        mutationKey: [],

        mutationFn: (data: ReviewFormValues) => appointmentApi.createReview(id, data)
        ,
        onSuccess() {
            toast.success("add successful");

        },

        onError(error) {
            toast.error(error.message);
        }
    }
    )
}