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
  forgotPassword: "/forgot-password",
  verifyOTP: "verify-otp",
  resetPassword: "/reset-password",
  // Protected — app shell examples
  dashboard: "/dashboard",
  settings: "/settings",
  profile: "/profile",
} as const;

export type PathKey = keyof typeof PATHS;
