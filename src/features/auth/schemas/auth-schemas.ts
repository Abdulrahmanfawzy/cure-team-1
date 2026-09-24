import z from "zod";

export const loginSchema = z.object({
  phone: z.string().trim().min(11, "Phone number must be at least 11 digits"),
  password: z.string().trim().min(6, "Password must be at least 6 digits"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 digits"),
  email: z.email("Email is not valid"),
  phone: z.string().trim().min(11, "Phone number must be at least 11 digits"),
  password: z.string().trim().min(6, "Password must be at least 6 digits"),
  rePassword: z
    .string()
    .trim()
    .min(6, "Confirm password must be at least 6 digits"),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "OTP is required")
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const forgetPasswordSchema = z.object({
  phone: z.string().trim().min(11, "Phone number must be at least 11 digits"),
});
export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(6, "New password must be at least 6 digits"),
  confirmNewPassword: z
    .string()
    .trim()
    .min(6, "Confirm new password must be at least 6 digits"),
});
