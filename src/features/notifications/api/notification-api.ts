import { api } from "@/lib/axios";

import type {
  Notification,
  NotificationsResponse,
} from "../types/notification-types";

export async function getNotifications(): Promise<Notification[]> {
  const response =
    await api.get<NotificationsResponse>("/user/notifications");

  return response.data.data;
}

export async function markNotificationAsRead(
  notificationId: string,
) {
  return api.patch(
    `/read/${notificationId}/notification`,
  );
}

export async function markAllNotificationsAsRead(
  userId: string,
) {
  return api.patch(
    `/notifications/${userId}/read-all`,
  );
}