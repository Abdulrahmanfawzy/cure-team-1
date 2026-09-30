import { z } from "zod";

export const paymentSchema = z.object({
  payment_method: z.string().min(1, "Please select a payment method"),
});

export const paymentFormSchema = paymentSchema.extend({
  booking_id: z.string().min(1, "Booking ID is required"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type PaymentFormWithBookingValues = z.infer<typeof paymentFormSchema>;