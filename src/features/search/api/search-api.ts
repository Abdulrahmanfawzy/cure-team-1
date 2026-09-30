import { apiClient } from "@/services/axios/client";

import type { SearchResponse } from "../types/search-types";

export async function searchDoctors(
  search: string,
  page = 1,
): Promise<SearchResponse> {
  const response =
    await apiClient.get<SearchResponse>(
      "/search",
      {
        params: {
          search,
          page,
        },
      },
    );

  return response.data;
}