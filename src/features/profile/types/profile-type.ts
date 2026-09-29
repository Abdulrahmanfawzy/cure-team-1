import {
  // PasswordManagementSchema,
  PersonalInformationSchema,
} from "../schemas/profile-schema";
import z from "zod";

export type PersonalInformationPayload = z.infer<
  typeof PersonalInformationSchema
>;

export type UserImage = {
  profile_image: File;
};

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  location: string | null;
  profile_image: string | null;
  is_active: boolean;
  created_at: string;
}

// export type PasswordManagementType = z.infer<typeof PasswordManagementSchema>;
