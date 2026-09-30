import z from "zod";
import {
  googleRegisterSchema,
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "../schemas/auth-schemas";

export type registerPayload = z.infer<typeof registerSchema>;
export type loginPayload = z.infer<typeof loginSchema>;
export type verifyOtpPayload = z.infer<typeof verifyOtpSchema>;
export type googleRegisterPayload = z.infer<typeof googleRegisterSchema>;

export type VerifyLoginResponse = {
  access_token: string;
  access_token_expires_at: string;
  raw_refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
};

export type googleLoginResponse = {
  temp_token: string;
};

export type googleLoginPayload = {
  token: string;
};

export type logoutPayload = {
  refresh_token: string;
};

export type GoogleAuthResponse = googleLoginResponse | VerifyLoginResponse;

export type resendOtpPayload = {
  phone: string;
  type: string;
};
export type resendOtpResponse = {
  resend_available_at: string;
};

export type refreshTokenPayload = {
  refresh_token: string;
};
