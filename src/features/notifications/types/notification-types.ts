export interface NotificationData {
  title: string;
  message: string;
  booking_id?: string;
}

export interface Notification {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  notifiable_type: string;
  notifiable_id: string;
  data: NotificationData;
  read_at: string | null;
}

export interface NotificationPagination {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface NotificationsResponse {
  message: string;
  data: NotificationPagination;
}

export interface UnreadNotificationsResponse {
  message: string;
  data: NotificationPagination;
}

export interface NotificationActionResponse {
  message: string;
}