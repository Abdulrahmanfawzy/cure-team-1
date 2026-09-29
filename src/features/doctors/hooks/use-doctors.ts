import { useQuery } from "@tanstack/react-query";
import { searchDoctors } from "../api/doctors-api";

interface UseDoctorsParams {
  search?: string;
  page?: number;
}

export function useDoctors({
  search = "",
  page = 1,
}: UseDoctorsParams = {}) {
  return useQuery({
    queryKey: ["doctors", search, page],
    queryFn: () => searchDoctors({ search, page }),
    staleTime: 60 * 1000,
  });
}