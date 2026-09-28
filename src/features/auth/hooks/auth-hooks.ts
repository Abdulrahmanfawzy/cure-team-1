import { useMutation } from "@tanstack/react-query";

import {
  loginRequest,
  registerRequest,
  verifyLogin,
  verifyRegister,
} from "../api/auth-api";

import type {
  loginPayload,
  registerPayload,
  VerifyLoginResponse,
  verifyOtpPayload,
} from "../types/auth-types";

import type { ApiResponse, AxiosErrorResponse } from "@/types/api";

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
