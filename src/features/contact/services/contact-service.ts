import { apiClient } from "@/services/axios/client";

import type {
  ContactFormData,
  ContactResponse,
} from "../types/contact-types";

export async function sendContactMessage(
  data: ContactFormData,
): Promise<ContactResponse> {
  const response = await apiClient.post<ContactResponse>(
    "/contact",
    data,
  );

  return response.data;
}