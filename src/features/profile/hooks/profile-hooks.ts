import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  editProfile,
  getProfile,
  type EditProfilePayload,
} from "../api/profile-api";
import type { ApiResponse, AxiosErrorResponse } from "@/types/api";
import type { ProfileResponse } from "../types/profile-type";

export const useProfile = (): UseQueryResult<
  ApiResponse<ProfileResponse>,
  AxiosErrorResponse
> => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useEditProfile = (): UseMutationResult<
  ApiResponse<ProfileResponse>,
  AxiosErrorResponse,
  EditProfilePayload
> => {
  return useMutation({
    mutationKey: ["edit_profile"],
    mutationFn: (payload: EditProfilePayload) => editProfile(payload),
  });
};
