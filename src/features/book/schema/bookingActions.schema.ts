import { z } from "zod";

export const rescheduleSchema = z.object({
  slot_id: z.string().min(1, "Please select a slot"),
});

export const bookAgainSchema = z.object({
  slot_id: z.string().min(1, "Please select a slot"),
});

export const cancelSchema = z.object({
  cancel_reason: z.string().min(5, "Please enter a cancellation reason"),
});

export const supportSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),

  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const feedbackSchema = z.object({
  comment: z.string().min(10, "Comment must be at least 10 characters"),

  rating: z.string().min(1, "Please select a rating"),
});
