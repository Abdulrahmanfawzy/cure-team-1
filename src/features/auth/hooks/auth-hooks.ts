import { useMutation } from "@tanstack/react-query";

import {
  googleCompleteRegister,
  googleLogin,
  googleVerifyLogin,
  loginRequest,
  registerRequest,
  verifyLogin,
  verifyRegister,
} from "../api/auth-api";

import type {
  GoogleAuthResponse,
  googleLoginPayload,
  googleRegisterPayload,
  loginPayload,
  registerPayload,
  VerifyLoginResponse,
  verifyOtpPayload,
} from "../types/auth-types";

import type { ApiResponse, AxiosErrorResponse } from "@/types/api";

// Auth Functions
export const useAuth = () => {
  const register = useMutation<
    ApiResponse<[]>,
    AxiosErrorResponse,
    registerPayload
  >({
    mutationKey: ["register"],
    mutationFn: (payload: registerPayload) => registerRequest(payload),
  });

  const verify_register = useMutation<
    ApiResponse<[]>,
    AxiosErrorResponse,
    verifyOtpPayload
  >({
    mutationKey: ["verify_register"],
    mutationFn: (payload: verifyOtpPayload) => verifyRegister(payload),
  });

  const login = useMutation<ApiResponse<[]>, AxiosErrorResponse, loginPayload>({
    mutationKey: ["login"],
    mutationFn: (payload: loginPayload) => loginRequest(payload),
  });

  const verify_login = useMutation<
    ApiResponse<VerifyLoginResponse>,
    AxiosErrorResponse,
    verifyOtpPayload
  >({
    mutationKey: ["verify_login"],
    mutationFn: (payload: verifyOtpPayload) => verifyLogin(payload),
  });

  return {
    register,
    login,
    verify_login,
    verify_register,
  };
};

// Google Auth Functions
export const useGoogleAuth = () => {
  const google_login = useMutation<
    ApiResponse<GoogleAuthResponse>,
    AxiosErrorResponse,
    googleLoginPayload
  >({
    mutationKey: ["google_login"],
    mutationFn: (payload: googleLoginPayload) => googleLogin(payload),
  });

  const google_register = useMutation<
    ApiResponse<[]>,
    AxiosErrorResponse,
    googleRegisterPayload
  >({
    mutationKey: ["google_login"],
    mutationFn: (payload: googleRegisterPayload) =>
      googleCompleteRegister(payload),
  });

  const google_verify = useMutation<
    ApiResponse<VerifyLoginResponse>,
    AxiosErrorResponse,
    verifyOtpPayload
  >({
    mutationKey: ["google_login"],
    mutationFn: (payload: verifyOtpPayload) => googleVerifyLogin(payload),
  });

  return {
    google_login,
    google_register,
    google_verify,
  };
};
