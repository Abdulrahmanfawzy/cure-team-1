import { Bell, HeartPulse, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { useProfile } from "@/features/profile/hooks/profile-hooks";
import {
  useMarkNotificationAsRead,
  useNotifications,
} from "@/features/notifications/hooks/use-notifications";
import { useDoctorSearch } from "@/features/search/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { getImageUrl } from "@/utils/image-url";

import { NotificationPopup } from "./notification-popup";
import { ProfileMobilePopup } from "./profile-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated,
  );

  const { data: profile } = useProfile();

  const debouncedSearch = useDebounce(searchValue, 400);
  const { data: searchResults, isFetching: isSearchLoading } =
    useDoctorSearch(debouncedSearch);

  const { data: notifications = [], isLoading: isNotificationsLoading } =
    useNotifications();

  const markAsRead = useMarkNotificationAsRead();

  const unreadCount = notifications.filter(
    (notification) => notification.read_at === null,
  ).length;

  const handleProfileClick = () => {
    if (window.innerWidth < 1024) {
      setIsProfileOpen(true);
      return;
    }

    navigate("/profile");
  };

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markAsRead.mutateAsync(notificationId);
    } finally {
      setIsNotificationOpen(false);
    }
  };

  const handleSearchSubmit = () => {
    const value = searchValue.trim();

    if (!value) {
      navigate("/doctors");
      return;
    }

    navigate(`/doctors?search=${encodeURIComponent(value)}`);
    setIsSearchFocused(false);
  };

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 bg-white">
        <div className="main_container">
          <div className="flex h-18 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2 text-app-primary"
              aria-label="Cure home"
            >
              <HeartPulse size={30} strokeWidth={2} />
            </Link>

            {/* Search */}
            <div className="relative hidden w-full max-w-66 lg:block">
              <label className="relative block">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-neutral"
                />

                <input
                  type="search"
                  value={searchValue}
                  placeholder="Search about specialty, doctor"
                  onChange={(event) => setSearchValue(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSearchSubmit();
                    if (event.key === "Escape") setIsSearchFocused(false);
                  }}
                  className="h-9 w-full rounded-md bg-app-neutral-lightest pl-9 pr-3 text-[11px] text-app-secondary outline-none placeholder:text-app-neutral focus:ring-1 focus:ring-app-primary-lighter"
                />
              </label>

              {isSearchFocused && searchValue.trim() && (
                <div className="absolute left-0 right-0 top-11 z-60 overflow-hidden rounded-xl border border-app-primary-lightest bg-white shadow-xl">
                  {isSearchLoading ? (
                    <div className="px-4 py-4 text-xs text-app-neutral-darker">
                      Searching...
                    </div>
                  ) : searchResults?.data?.length ? (
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.data.slice(0, 5).map((doctor) => (
                        <button
                          key={doctor.id}
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            navigate(`/doctors-details?id=${doctor.id}`);
                            setSearchValue("");
                            setIsSearchFocused(false);
                          }}
                          className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-app-primary-lightest"
                        >
                          <div className="size-9 shrink-0 overflow-hidden rounded-full bg-app-neutral-lightest">
                            {doctor.profile_image ? (
                              <img
                                src={getImageUrl(doctor.profile_image)}
                                alt={doctor.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[8px] text-app-neutral">
                                No
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-app-secondary">
                              {doctor.name}
                            </p>

                            <p className="mt-0.5 truncate text-[9px] text-app-neutral-darker">
                              {doctor.specialist?.name}
                            </p>
                          </div>
                        </button>
                      ))}

                      {searchResults.pagination?.total > 5 && (
                        <button
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            handleSearchSubmit();
                          }}
                          className="w-full border-t border-app-neutral-lightest px-4 py-3 text-center text-[10px] font-medium text-app-primary hover:bg-app-primary-lightest"
                        >
                          View all results
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-xs text-app-neutral-darker">
                      No doctors found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Menu */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="flex size-9 items-center justify-center rounded-md bg-app-neutral-lightest text-app-secondary transition-colors hover:bg-app-primary-lightest"
              >
                {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsNotificationOpen((prev) => !prev)
                      }
                      aria-label="Notifications"
                      aria-expanded={isNotificationOpen}
                      className="relative flex size-9 items-center justify-center rounded-md bg-app-neutral-lightest text-app-secondary transition-colors hover:bg-app-primary-lightest"
                    >
                      <Bell size={15} />

                      {!isNotificationsLoading && unreadCount > 0 && (
                        <span className="absolute right-1 top-1 size-2.5 rounded-full bg-green-500 ring-2 ring-app-neutral-lightest" />
                      )}
                    </button>

                    {isNotificationOpen && (
                      <NotificationPopup
                        notifications={notifications}
                        onClose={() => setIsNotificationOpen(false)}
                        onNotificationClick={(notification) =>
                          handleNotificationClick(notification.id)
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
                    {profile?.data?.profile_image && (
                      <img
                        src={getImageUrl(profile.data.profile_image)}
                        alt={profile.data.name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg bg-app-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-app-primary/90"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-4 top-16 w-64 overflow-hidden rounded-2xl border border-app-primary-lightest bg-white shadow-lg">
              <nav className="p-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Home
                </Link>

                <Link
                  to="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Booking
                </Link>

                <Link
                  to="/chat"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Chat
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {isProfileOpen && (
        <ProfileMobilePopup
          onClose={() => setIsProfileOpen(false)}
          profile={profile?.data}
        />
      )}
    </>
  );
}