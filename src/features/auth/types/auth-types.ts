import z from "zod";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "../schemas/auth-schemas";

export type registerPayload = z.infer<typeof registerSchema>;
export type loginPayload = z.infer<typeof loginSchema>;
export type verifyOtpPayload = z.infer<typeof verifyOtpSchema>;

export type VerifyLoginResponse = {
  access_token: string;
  access_token_expires_at: string;
  raw_refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
};
