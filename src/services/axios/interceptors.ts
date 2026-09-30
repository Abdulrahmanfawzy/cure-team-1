import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { authStorage } from "@/features/auth/utils/auth-storage";

export interface RequestConfig
  extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorToast?: boolean;
}

export interface ApiErrorBody {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export function setupInterceptors(
  client: AxiosInstance,
): void {
  client.interceptors.request.use(
    (config: RequestConfig) => {
      if (!config.skipAuth) {
        const token =
          authStorage.getAccessToken();

        if (token) {
          config.headers.Authorization =
            `Bearer ${token}`;
        }
      }

      return config;
    },
  );

  client.interceptors.response.use(
    (response) => response,

    (
      error: AxiosError<ApiErrorBody>,
    ) => {
      return Promise.reject(error);
    },
  );
}