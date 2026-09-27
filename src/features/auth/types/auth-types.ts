import z from "zod";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "../schemas/auth-schemas";

export type registerPayload = z.infer<typeof registerSchema>;
export type loginPayload = z.infer<typeof loginSchema>;
export type verifyOtpPayload = z.infer<typeof verifyOtpSchema>;
