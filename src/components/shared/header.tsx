import {
  Bell,
  HeartPulse,
  Menu,
  Search,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ProfileMobilePopup } from "./profile-menu";
import { NotificationPopup } from "./notification-popup";

import {
  useMarkNotificationAsRead,
  useNotifications,
} from "@/features/notifications/hooks/use-notifications";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: notifications = [],
    isLoading: isNotificationsLoading,
  } = useNotifications();

  const markAsRead = useMarkNotificationAsRead();

  const unreadCount = notifications.filter((notification) => {
    if (typeof notification.is_read === "boolean") {
      return !notification.is_read;
    }

    return notification.read_at == null;
  }).length;

  const handleProfileClick = () => {
    if (window.innerWidth < 1024) {
      setIsProfileOpen(true);
      return;
    }

    navigate("/profile");
  };

  const handleNotificationClick = async (
    notificationId: string,
  ) => {
    try {
      await markAsRead.mutateAsync(notificationId);
    } finally {
      setIsNotificationOpen(false);
    }
  };

  return (
    <>
      <header className="sticky bg-white inset-x-0 top-0 z-50">
        <div className="main_container">
          <div className="flex h-18 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2 text-app-primary"
              aria-label="Cure home"
            >
              <HeartPulse
                size={30}
                strokeWidth={2}
              />
            </Link>

            {/* Search */}
            <div className="hidden w-full max-w-66 lg:block">
              <label className="relative block">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-neutral"
                />

                <input
                  type="search"
                  placeholder="Search about specialty, doctor"
                    onKeyDown={(event) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();

      navigate(
        value
          ? `/doctors?search=${encodeURIComponent(value)}`
          : "/doctors",
      );
    }
  }}

                  className="h-9 w-full rounded-md bg-app-neutral-lightest pl-9 pr-3 text-[11px] text-app-secondary outline-none placeholder:text-app-neutral focus:ring-1 focus:ring-app-primary-lighter"
                />
              </label>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Menu */}
              <button
                type="button"
                onClick={() =>
                  setIsMenuOpen((prev) => !prev)
                }
                aria-label={
                  isMenuOpen
                    ? "Close menu"
                    : "Open menu"
                }
                aria-expanded={isMenuOpen}
                className="flex size-9 items-center justify-center rounded-md bg-app-neutral-lightest text-app-secondary transition-colors hover:bg-app-primary-lightest"
              >
                {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>

              {/* Notification */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsNotificationOpen(
                      (prev) => !prev,
                    )
                  }
                  aria-label="Notifications"
                  aria-expanded={
                    isNotificationOpen
                  }
                  className="relative flex size-9 items-center justify-center rounded-md bg-app-neutral-lightest text-app-secondary transition-colors hover:bg-app-primary-lightest"
                >
                  <Bell size={15} />

                  {/* Green unread dot */}
                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 size-2.5 rounded-full bg-green-500 ring-2 ring-app-neutral-lightest" />
                  )}
                </button>

                {/* Notification Popup */}
                {isNotificationOpen && (
                  <NotificationPopup
                    notifications={notifications}
                    onClose={() =>
                      setIsNotificationOpen(false)
                    }
                    onNotificationClick={(
                      notification,
                    ) =>
                      handleNotificationClick(
                        notification.id,
                      )
                    }
                  />
                )}
              </div>

              {/* Profile */}
              <button
                type="button"
                onClick={handleProfileClick}
                aria-label="Open profile"
                className="size-9 overflow-hidden rounded-full border-2 border-white bg-app-primary shadow-sm"
              >
                <img
                  src="/images/avatar.png"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Header Menu */}
          {isMenuOpen && (
            <div className="absolute right-4 top-16 w-64 overflow-hidden rounded-2xl border border-app-primary-lightest bg-white shadow-lg">
              <nav className="p-3">
                <Link
                  to="/"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Home
                </Link>

                <Link
                  to="/booking"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Booking
                </Link>

                <Link
                  to="/chat"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Chat
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Profile */}
      {isProfileOpen && (
        <ProfileMobilePopup onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  );
}
