import z from "zod";

export const PersonalInformationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone is required"),
  email: z.email("Email is invalid"),
  location: z.string().trim().min(1, "Location is required"),
});

export const PasswordManagementSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(6, "Old Password must be at least 6 characters long"),
  newPassword: z
    .string()
    .trim()
    .min(6, "New Password must be at least 6 characters long"),
  confirmNewPassword: z
    .string()
    .trim()
    .min(6, "Confirm New Password must be at least 6 characters long"),
});
