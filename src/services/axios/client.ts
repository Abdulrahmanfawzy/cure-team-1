import { refreshToken } from "@/features/auth/api/auth-api";
import type { refreshTokenPayload } from "@/features/auth/types/auth-types";
import { authStorage } from "@/features/auth/utils/auth-storage";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const refreshTokenApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = authStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh Token
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refreshTokenValue = authStorage.getRefreshToken();
    if (!refreshTokenValue) {
      return Promise.reject(error);
    }

    const payload: refreshTokenPayload = {
      refresh_token: refreshTokenValue,
    };

    try {
      const { data } = await refreshToken(payload);

      authStorage.setTokens(
        data.access_token,
        data.raw_refresh_token,
        data.refresh_token_expires_at,
        data.access_token_expires_at,
      );

      error.config.headers.Authorization = `Bearer ${data.access_token}`;

      return apiClient(error.config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
