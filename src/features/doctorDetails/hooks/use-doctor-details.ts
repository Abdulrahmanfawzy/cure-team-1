import { useQuery } from "@tanstack/react-query";
import {
  getDoctorDetails,
} from "../api/doctor-details-api";

export function useDoctorDetails(
  doctorId?: string,
) {
  return useQuery({
    queryKey: [
      "doctor-details",
      doctorId,
    ],

    queryFn: () =>
      getDoctorDetails(doctorId!),

    enabled: Boolean(doctorId),

    staleTime: 60 * 1000,
  });
}