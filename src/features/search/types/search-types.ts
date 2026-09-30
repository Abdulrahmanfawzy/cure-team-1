import type { Doctor } from "@/features/home/types/home.types";

export interface SearchPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface SearchResponse {
  message: string;
  data: Doctor[];
  pagination: SearchPagination;
}