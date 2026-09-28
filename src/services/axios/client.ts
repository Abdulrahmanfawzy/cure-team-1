import axios from "axios";

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
  headers: {
    // "Content-Type": "application/json",
    Authorization:
      "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JvdW5kLTEzLWN1cmUuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4vdmVyaWZ5IiwiaWF0IjoxNzkwNjAzMDU2LCJleHAiOjQ3OTA2MDMwNTYsIm5iZiI6MTc5MDYwMzA1NiwianRpIjoiT3J3blRQOGdldDh2S0w5UCIsInN1YiI6IjAxYTBlODQyLTJiMzItNzA2Ny04ODAxLWNmNGQ4OWI0NjBmMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.-s4IFZ94TEEqEhGyirbOlm2TRzLPdHxRxBzcKI1h5Bk",
  },
  timeout: 15_000,
});
