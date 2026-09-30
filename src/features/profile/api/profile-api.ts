import type { ApiResponse } from "@/types/api";
import type {
  PersonalInformationPayload,
  ProfileResponse,
  UserImage,
} from "../types/profile-type";
import { apiClient } from "@/services/axios/client";

export const getProfile = async (): Promise<ApiResponse<ProfileResponse>> => {
  const { data } = await apiClient.get("profile");
  return data;
};

export type EditProfilePayload = Partial<PersonalInformationPayload> &
  Partial<UserImage>;

export const editProfile = async (
  payload?: EditProfilePayload,
): Promise<ApiResponse<ProfileResponse>> => {
  const formData = new FormData();
  const ArrayFromPayload = Object.entries(payload ?? {});
  ArrayFromPayload.forEach(([key, value]) => formData.append(key, value));

  const { data } = await apiClient.post("profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
