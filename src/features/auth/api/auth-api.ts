import { apiClient } from "@/services/axios";
import type {
  GoogleAuthResponse,
  googleLoginPayload,
  googleRegisterPayload,
  loginPayload,
  registerPayload,
  VerifyLoginResponse,
  verifyOtpPayload,
} from "../types/auth-types";
import type { ApiResponse } from "@/types/api";

export const registerRequest = async (
  payload: registerPayload,
): Promise<ApiResponse<[]>> => {
  const { data } = await apiClient.post("auth/register", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const loginRequest = async (
  payload: loginPayload,
): Promise<ApiResponse<[]>> => {
  const { data } = await apiClient.post("auth/login", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const verifyRegister = async (
  payload: verifyOtpPayload,
): Promise<ApiResponse<[]>> => {
  const { data } = await apiClient.post("auth/register/verify", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const verifyLogin = async (
  payload: verifyOtpPayload,
): Promise<ApiResponse<VerifyLoginResponse>> => {
  const { data } = await apiClient.post("auth/login/verify", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Google Auth

export const googleLogin = async (
  payload: googleLoginPayload,
): Promise<ApiResponse<GoogleAuthResponse>> => {
  const { data } = await apiClient.post("auth/google/callback", payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data;
};

export const googleCompleteRegister = async (
  payload: googleRegisterPayload,
): Promise<ApiResponse<[]>> => {
  const { data } = await apiClient.post(
    "auth/google/complete-registration",
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  return data;
};

export const googleVerifyLogin = async (
  payload: verifyOtpPayload,
): Promise<ApiResponse<VerifyLoginResponse>> => {
  const { data } = await apiClient.post("auth/google/verify", payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data;
};
