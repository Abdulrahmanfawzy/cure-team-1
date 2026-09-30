import { apiClient } from "./client";
import { setupInterceptors } from "./interceptors";

setupInterceptors(apiClient);

// export { apiClient };

export type {
  ApiErrorBody,
  RequestConfig,
} from "./interceptors";