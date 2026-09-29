import { useQuery } from "@tanstack/react-query";
import { appointmentApi } from "../services/appointment.service";

export default function useSpecificDoctor(id: string) {
    return useQuery({
        queryKey: ["doctor", id],
        queryFn: () => appointmentApi.getSpecificDoctor(id)
    })


}