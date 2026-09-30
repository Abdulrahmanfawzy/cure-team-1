import { apiClient } from "@/services/axios/client";

import type {
  Doctor,
  FAQItem,
  HomeApiResponse,
  Review,
  Specialty,
} from "../types/home.types";

export const getSpecialties = async (): Promise<Specialty[]> => {
  const response = await apiClient.get<HomeApiResponse<Specialty[]>>(
    "/home/specialties",
  );

  return response.data.data;
};

export const getNearbyDoctors = async (): Promise<Doctor[]> => {
  const response = await apiClient.get<HomeApiResponse<Doctor[]>>(
    "/home/doctors-nearby",
  );

  return response.data.data;
};

export const getTopRatedDoctors = async (): Promise<Doctor[]> => {
  const response = await apiClient.get<HomeApiResponse<Doctor[]>>(
    "/home/doctors-top-rated",
  );

  return response.data.data;
};

export const getReviews = async (): Promise<Review[]> => {
  const response = await apiClient.get<HomeApiResponse<Review[]>>(
    "/home/reviews",
  );

  return response.data.data;
};

export const getFAQs = async (): Promise<FAQItem[]> => {
  const response = await apiClient.get<HomeApiResponse<FAQItem[]>>("/faqs");

  return response.data.data;
};