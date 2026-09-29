export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

// Please Don't edit This Types

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface AxiosErrorResponse extends Error {
  response?: { data?: { message?: string } };
}
