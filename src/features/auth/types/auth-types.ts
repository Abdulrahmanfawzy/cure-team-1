import z from "zod";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
} from "../schemas/auth-schemas";

export type registerPayloadtype = z.infer<typeof registerSchema>;
export type loginPayloadType = z.infer<typeof loginSchema>;
export type verifyOtpPayloadType = z.infer<typeof verifyOtpSchema>;
export type resetPasswordPayloadType = z.infer<typeof resetPasswordSchema>;
export type forgetPasswordPayloadType = z.infer<typeof forgetPasswordSchema>;
