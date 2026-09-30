export interface PaymentPayload {
  booking_id: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    url: string;
    session_id: string;
  };
}


