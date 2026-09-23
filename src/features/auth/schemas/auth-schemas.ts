import z from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 digits"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 digits"),
  email: z.email("Email is not valid"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 digits"),
  rePassword: z.string().min(6, "Confirm password must be at least 6 digits"),
});

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const forgetPasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 digits"),
  newPassword: z.string().min(6, "New password must be at least 6 digits"),
  confirmNewPassword: z
    .string()
    .min(6, "Confirm new password must be at least 6 digits"),
});
