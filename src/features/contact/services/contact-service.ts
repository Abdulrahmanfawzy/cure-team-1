import axios from "axios";
import type { ContactFormData, ContactResponse } from "../types/contact-types";

const API_URL = import.meta.env.VITE_API_URL;

export const sendContactMessage = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  const response = await axios.post<ContactResponse>(
    `${API_URL}/contact`,
    data
  );

  return response.data;
};