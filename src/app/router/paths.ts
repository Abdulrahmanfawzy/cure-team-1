/**
 * Centralized route path constants.
 *
 * Use these instead of hardcoding URL strings in components/links.
 * Feature routes can be merged here or exported from the feature
 * and re-exported for the router.
 */
export const PATHS = {
  home: "/",
  // Public
  login: "/login",
  register: "/register",
  verifyOTP: "/verify-otp",
  GoogleCompleteRegister: "/google_complete_register",

  // Protected — app shell examples
  dashboard: "/dashboard",
  settings: "/settings",
  contact: "/contact",

  // Profile
  profile: "/profile",
  personalInformation: "personal-information",
  passwordManagement: "password-management",
  doctors: "/doctors",
  doctorDetails: "/doctors-details",

  // book
  appointment: "/appointment",
  book: "/book",
  payment: "/payment/:bookingId",
  successPayment: "/success-payment",
  failPayment: "/fail-payment",
  chat: "/chat",
} as const;

export type PathKey = keyof typeof PATHS;
