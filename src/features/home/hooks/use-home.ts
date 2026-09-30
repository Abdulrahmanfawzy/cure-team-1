import { useQuery } from "@tanstack/react-query";

import {
  getFAQs,
  getNearbyDoctors,
  getReviews,
  getSpecialties,
  getTopRatedDoctors,
} from "../api/home-api";

export function useSpecialties() {
  return useQuery({
    queryKey: ["home", "specialties"],
    queryFn: getSpecialties,
  });
}

export function useTopRatedDoctors() {
  return useQuery({
    queryKey: ["home", "top-rated-doctors"],
    queryFn: getTopRatedDoctors,
  });
}

export function useNearbyDoctors() {
  return useQuery({
    queryKey: ["home", "nearby-doctors"],
    queryFn: getNearbyDoctors,
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["home", "reviews"],
    queryFn: getReviews,
  });
}

export function useFAQs() {
  return useQuery({
    queryKey: ["home", "faqs"],
    queryFn: getFAQs,
  });
}