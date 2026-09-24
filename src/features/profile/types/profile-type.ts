import {
  PasswordManagementSchema,
  PersonalInformationSchema,
} from "../schemas/profile-schema";
import z from "zod";

export type PersonalInformationType = z.infer<typeof PersonalInformationSchema>;

export type PasswordManagementType = z.infer<typeof PasswordManagementSchema>;
