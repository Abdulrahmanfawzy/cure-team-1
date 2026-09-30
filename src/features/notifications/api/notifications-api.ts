import { apiClient } from "@/services/axios/client";

import type {
  NotificationActionResponse,
  Notification,
  NotificationsResponse,
  UnreadNotificationsResponse,
} from "../types/notification-types";

/**
 * Get all notifications for the authenticated user.
 */
export async function getNotifications(): Promise<Notification[]> {
  const response =
    await apiClient.get<NotificationsResponse>(
      "/user/notifications",
    );

  return response.data.data.data;
}

/**
 * Get only unread notifications.
 */
export async function getUnreadNotifications(): Promise<
  Notification[]
> {
  const response =
    await apiClient.get<UnreadNotificationsResponse>(
      "/user/unread-messages",
    );

  return response.data.data.data;
}

/**
 * Mark one notification as read.
 *
 * PATCH /user/read/{notification_id}/notification
 */
export async function markNotificationAsRead(
  notificationId: string,
): Promise<NotificationActionResponse> {
  const response =
    await apiClient.patch<NotificationActionResponse>(
      `/user/read/${notificationId}/notification`,
    );

  return response.data;
}

/**
 * Mark all notifications as read.
 *
 * PATCH /user/read-all
 */
export async function markAllNotificationsAsRead(): Promise<NotificationActionResponse> {
  const response =
    await apiClient.patch<NotificationActionResponse>(
      "/user/read-all",
    );

  return response.data;
}