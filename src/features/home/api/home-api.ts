import { apiClient } from "@/services/axios/client";

import type {
  Doctor,
  FAQItem,
  HomeApiResponse,
  Review,
  Specialty,
} from "../types/home.types";

export async function getSpecialties(): Promise<Specialty[]> {
  const response = await apiClient.get<HomeApiResponse<Specialty[]>>(
    "/home/specialties",
  );

  return response.data.data;
}

export async function getTopRatedDoctors(): Promise<Doctor[]> {
  const response = await apiClient.get<HomeApiResponse<Doctor[]>>(
    "/home/doctors-top-rated",
  );

  return response.data.data;
}

export async function getNearbyDoctors(): Promise<Doctor[]> {
  const response = await apiClient.get<HomeApiResponse<Doctor[]>>(
    "/home/doctors-nearby",
  );

  return response.data.data;
}

export async function getReviews(): Promise<Review[]> {
  const response = await apiClient.get<HomeApiResponse<Review[]>>(
    "/home/reviews",
  );

  return response.data.data;
}

export async function getFAQs(): Promise<FAQItem[]> {
  const response = await apiClient.get<HomeApiResponse<FAQItem[]>>(
    "/faqs",
  );

  return response.data.data;
}