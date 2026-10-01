import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../services/book.services";

export default function useGetSpecificBook(id: string) {
  return useQuery({
    queryKey: ["specificBook", id],
    queryFn: () => bookApi.getSpecificBook(id),
  });
}
