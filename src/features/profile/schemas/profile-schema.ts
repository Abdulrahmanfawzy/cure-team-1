import z from "zod";

export const PersonalInformationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone is required"),
  email: z.email("Email is invalid"),
  location: z.string().trim(),
  birth_date: z.string().trim(),
});

// "id": "01a0e7db-8afe-711a-b590-bbf98e35cf7e",
//         "name": "mohammed hussein",
//         "email": "mohammed1225@gmail.com",
//         "phone": "01141547842",
//         "birth_date": null,
//         "location": "Yemen, Aden, Al Mansoura",
//         "profile_image": null,
//         "is_active": true,
//         "created_at": "2026-09-28T11:52:00.000000Z"

// export const PasswordManagementSchema = z.object({
//   oldPassword: z
//     .string()
//     .trim()
//     .min(6, "Old Password must be at least 6 characters long"),
//   newPassword: z
//     .string()
//     .trim()
//     .min(6, "New Password must be at least 6 characters long"),
//   confirmNewPassword: z
//     .string()
//     .trim()
//     .min(6, "Confirm New Password must be at least 6 characters long"),
// });
