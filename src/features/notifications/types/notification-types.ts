export interface Notification {
  id: string;
  title: string;
  message: string;
  created_at?: string;
  created_at_human?: string;
  read_at?: string | null;
  is_read?: boolean;
  type?: string;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}