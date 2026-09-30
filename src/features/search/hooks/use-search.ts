import { useQuery } from "@tanstack/react-query";

import { searchDoctors } from "../api/search-api";

export function useDoctorSearch(
  search: string,
  page = 1,
) {
  const trimmedSearch = search.trim();

  return useQuery({
    queryKey: [
      "search",
      "doctors",
      trimmedSearch,
      page,
    ],

    queryFn: () =>
      searchDoctors(
        trimmedSearch,
        page,
      ),

    enabled: trimmedSearch.length > 0,

    staleTime: 30_000,
  });
}