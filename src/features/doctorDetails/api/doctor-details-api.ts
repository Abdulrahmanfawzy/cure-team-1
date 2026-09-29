import { apiClient } from "@/services/axios/client";

export interface GetDoctorDetailsParams {
  date?: string;
  latitude?: number;
  longitude?: number;
}

export async function getDoctorDetails(
  doctorId: string,
  params?: GetDoctorDetailsParams,
) {
  const response = await apiClient.get(
    `/doctor/${doctorId}`,
    {
      params,
    },
  );

  return response.data;
}