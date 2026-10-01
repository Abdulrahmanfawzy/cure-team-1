import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../services/book.services";
import type { ResponseBook } from "../types/book.types";

export default function useGetAllBook() {
  return useQuery<ResponseBook>({
    queryKey: ["all-book"],
    queryFn: () => bookApi.getAllBook(),
  });
}
