import {
  ChevronRight,
  CreditCard,
  Heart,
  LockKeyhole,
  LogOut,
  MapPin,
  Settings,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import { getImageUrl } from "@/utils/image-url";

import type { ProfileResponse } from "@/features/profile/types/profile-type";

interface ProfileMobilePopupProps {
  onClose: () => void;
  profile?: ProfileResponse;
}

const profileItems = [
  {
    label: "Payment Method",
    icon: CreditCard,
    to: "/payment-method",
  },
  {
    label: "Favorite",
    icon: Heart,
    to: "/favorite",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
  {
    label: "Privacy Policy",
    icon: LockKeyhole,
    to: "/privacy-policy",
  },
];

export function ProfileMobilePopup({
  onClose,
  profile,
}: ProfileMobilePopupProps) {
  const profileImage = profile?.profile_image
    ? getImageUrl(profile.profile_image)
    : "/images/avatar.png";

  const profileName = profile?.name || "User";

  const profileLocation =
    profile?.location || "Cairo";

  return (
    <div className="fixed inset-0 z-[100] bg-white lg:hidden">
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close profile menu"
        className="
          absolute right-5 top-6
          flex size-12 items-center
          justify-center rounded-xl
          bg-app-neutral-lightest
          text-app-secondary
        "
      >
        <X
          size={28}
          strokeWidth={1.8}
        />
      </button>

      <div className="h-full overflow-y-auto px-8 pb-8 pt-36">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="size-20 shrink-0 overflow-hidden rounded-full bg-app-neutral-lightest">
            <img
              src={profileImage}
              alt={profileName}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="font-serif text-xl leading-tight text-app-secondary">
              {profileName}
            </h2>

            <div className="mt-1.5 flex items-center gap-1.5 text-base text-app-neutral-darker">
              <MapPin
                size={18}
                strokeWidth={1.8}
              />

              <span className="truncate">
                {profileLocation}
              </span>
            </div>
          </div>

          <Link
            to="/settings"
            onClick={onClose}
            aria-label="Profile settings"
            className="ml-auto shrink-0 text-app-primary"
          >
            <Settings
              size={25}
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* Menu */}
        <nav className="mt-14">
          <div className="space-y-7">
            {profileItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className="
                    flex items-center gap-4
                    text-app-secondary
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>{item.label}</span>

                  <ChevronRight
                    size={25}
                    strokeWidth={1.8}
                    className="ml-auto text-app-neutral"
                  />
                </Link>
              );
            })}
          </div>

          {/* Log out */}
          <button
            type="button"
            onClick={onClose}
            className="
              mt-7 flex items-center gap-4
              text-[#fc4b4e]
            "
          >
            <LogOut
              size={20}
              strokeWidth={1.8}
            />

            <span>Log out</span>
          </button>
        </nav>
      </div>
    </div>
  );
}