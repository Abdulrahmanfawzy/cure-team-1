import { useQuery } from "@tanstack/react-query";
import { appointmentApi } from "../services/appointment.services";

export const useDoctorSpecificAppointment = (doctorId: string) => {
  const query = useQuery({
    queryKey: ["doctor-specific-appointment"],
    queryFn: () => appointmentApi.getDoctorSpecificAppointment(doctorId),
  });

  return query;
};
