import {
  Bell,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  X,
} from "lucide-react";

import type { Notification } from "@/features/notifications/types/notification-types";

interface NotificationPopupProps {
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (
    notification: Notification,
  ) => void;
}

function getNotificationIcon(notification: Notification) {
  const type = notification.type?.toLowerCase() ?? "";
  const title =
    notification.data?.title?.toLowerCase() ?? "";

  if (
    type.includes("cancel") ||
    title.includes("cancel")
  ) {
    return CalendarX;
  }

  if (
    type.includes("complete") ||
    title.includes("complete")
  ) {
    return CalendarCheck;
  }

  if (
    type.includes("appointment") ||
    title.includes("appointment") ||
    type.includes("booking")
  ) {
    return CalendarClock;
  }

  return Bell;
}

function getNotificationStyle(notification: Notification) {
  const type = notification.type?.toLowerCase() ?? "";
  const title =
    notification.data?.title?.toLowerCase() ?? "";

  if (
    type.includes("cancel") ||
    title.includes("cancel")
  ) {
    return {
      wrapper: "bg-red-50",
      icon: "text-red-600",
    };
  }

  if (
    type.includes("complete") ||
    title.includes("complete")
  ) {
    return {
      wrapper: "bg-green-50",
      icon: "text-green-600",
    };
  }

  return {
    wrapper: "bg-app-primary-lightest",
    icon: "text-app-primary",
  };
}

function isUnread(notification: Notification) {
  return notification.read_at === null;
}

function formatNotificationDate(
  createdAt: string,
) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function NotificationPopup({
  notifications,
  onClose,
  onNotificationClick,
}: NotificationPopupProps) {
  return (
    <div className="absolute right-0 top-12 z-70 w-[min(92vw,560px)] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
      {/* Header */}
      <div className="flex items-center justify-between bg-app-neutral-lightest px-6 py-5">
        <h2 className="font-serif text-2xl text-app-secondary">
          Your Notification
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close notifications"
          className="flex size-8 items-center justify-center rounded-full text-app-secondary hover:bg-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Notifications */}
      <div className="max-h-125 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center px-6 text-sm text-app-neutral-darker">
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon =
              getNotificationIcon(notification);

            const style =
              getNotificationStyle(notification);

            const unread =
              isUnread(notification);

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  onNotificationClick(notification)
                }
                className={`relative flex w-full gap-4 px-6 py-5 text-left transition-colors hover:bg-app-neutral-lightest ${
                  unread
                    ? "bg-white"
                    : "bg-app-neutral-lightest/40"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-full ${style.wrapper}`}
                >
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                    className={style.icon}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg leading-tight text-app-secondary">
                      {notification.data.title}
                    </h3>

                    <span className="shrink-0 text-sm text-app-neutral">
                      {formatNotificationDate(
                        notification.created_at,
                      )}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-app-neutral-darker">
                    {notification.data.message}
                  </p>
                </div>

                {/* Unread dot */}
                {unread && (
                  <span className="absolute right-4 top-4 size-2.5 rounded-full bg-green-500" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}