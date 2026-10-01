import { apiClient } from "@/services/axios/client";
import type { PaymentPayload, PaymentResponse } from "../types/payment.types";

export const makePayment = async (
  payload: PaymentPayload,
): Promise<PaymentResponse> => {
  const response = await apiClient.post<PaymentResponse>("/payments", payload);

  return response.data;
};
