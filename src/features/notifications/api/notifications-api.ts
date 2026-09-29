import { apiClient } from "@/services/axios/client";

import type {
  Notification,
} from "../types/notification-types";

export async function getNotifications(): Promise<
  Notification[]
> {
  const response = await apiClient.get(
    "/user/notifications",
  );

  const data =
    response.data?.data ??
    response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
}

export async function markNotificationAsRead(
  notificationId: string,
) {
  const response = await apiClient.patch(
    `/notifications/${notificationId}/read`,
  );

  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response = await apiClient.patch(
    "/notifications/read-all",
  );

  return response.data;
}