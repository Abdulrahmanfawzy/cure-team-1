// reviewSchema.ts
import { z } from "zod";

export const reviewSchema = z.object({
    rating: z
        .number()
        .min(1, "Please select a rating")
        .max(5),

    comment: z
        .string()
        .min(3, "Review must be at least 3 characters")
        .max(500, "Review must be less than 500 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;