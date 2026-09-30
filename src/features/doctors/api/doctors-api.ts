import { apiClient } from "@/services/axios/client";

export interface SearchDoctorsParams {
  search?: string;
  page?: number;
}

export async function searchDoctors({
  search = "",
  page = 1,
}: SearchDoctorsParams = {}) {
  const response = await apiClient.get("/search", {
    params: {
      search: search || undefined,
      page,
    },
  });

  return response.data;
}