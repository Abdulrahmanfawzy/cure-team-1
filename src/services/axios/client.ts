import axios from "axios";
import { config } from "zod";

/**
 * Centralized Axios instance.
 *
 * All HTTP requests should go through this client — never call
 * `axios.get/post/...` directly from features.
 *
 * Feature API functions (in `features/<name>/api/`) import this client
 * and define endpoint-specific calls.
 *
 * Env vars are defined in `.env` / `.env.local` (see `.env.example`).
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});
