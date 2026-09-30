import z from "zod";

const createBookAppointmentSchema = z.object({
  doctor_id: z.string(),
  slot_id: z.string(),
  consultation_type: z.enum(["in_person", "online"]),
});

export type CreateBookAppointmentInput = z.infer<
  typeof createBookAppointmentSchema
>;

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),

  comment: z
    .string()
    .min(3, "Review must be at least 3 characters")
    .max(500, "Review must be less than 500 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
