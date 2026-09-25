import { Bell, HeartPulse, Menu, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ProfileMobilePopup } from "./profile-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Mobile
    if (window.innerWidth < 1024) {
      setIsProfileOpen(true);
      return;
    }

    // Desktop
    navigate("/profile");
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="main_contaoner">
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
            <div className="hidden w-full max-w-66 lg:block">
              <label className="relative block">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-app-neutral"
                />

                <input
                  type="search"
                  placeholder="Search about specialty, doctor"
                  className="h-9 w-full rounded-md bg-app-neutral-lightest pl-9 pr-3 text-[11px] text-app-secondary outline-none placeholder:text-app-neutral focus:ring-1 focus:ring-app-primary-lighter"
                />
              </label>
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
                {isMenuOpen ? (
                  <X size={17} />
                ) : (
                  <Menu size={17} />
                )}
              </button>

              {/* Notification */}
              <button
                type="button"
                aria-label="Notifications"
                className="hidden size-9 items-center justify-center rounded-md bg-app-neutral-lightest text-app-secondary transition-colors hover:bg-app-primary-lightest sm:flex"
              >
                <Bell size={15} />
              </button>

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
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-app-secondary hover:bg-app-primary-lightest"
                >
                  Home
                </Link>

                <Link
                  to="/booking"
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

      {/* Mobile Profile Popup */}
      {isProfileOpen && (
        <ProfileMobilePopup
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
}