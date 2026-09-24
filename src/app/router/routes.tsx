import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import { ProtectedRoute } from "./guards/protected-route";
import { RootLayout } from "./layouts/root-layout";
import { PATHS } from "./paths";
import { DashboardPage } from "./pages/dashboard-page";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { NotFoundPage } from "./pages/not-found-page";
import { RegisterPage } from "./pages/register-page";
import VerifyOTP from "@/features/auth/pages/VerifyOTP";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import ForgetPassword from "@/features/auth/pages/ForgetPassword";
import ProfilePage from "@/features/profile/pages/PasswordManagement";
import ProfileLayout from "@/features/profile/pages/ProfileLayout";
import PasswordManagement from "@/features/profile/pages/PasswordManagement";
import PersonalInformation from "@/features/profile/pages/PersonalInformation";
// import ForgetPassowrd from "@/features/auth/pages/ForgetPassowrd";
import DoctorsPage from "@/features/doctors/pages/DoctorsPage";
import AppointmentPage from "@/features/appointment/pages/AppointmentPage";

/**
 * Route tree.
 *
 * Structure:
 * - RootLayout wraps every route (global chrome + Toaster + <Outlet />)
 * - Public routes render directly
 * - Protected routes nest under <ProtectedRoute />
 * - Feature routes: import page components from `features/<name>` and
 *   add them here (or compose nested children per feature)
 *
 * Adding routes:
 * 1. Add the path to `paths.ts`
 * 2. Create/reuse a page component
 * 3. Register it below (public, protected, or nested)
 */
const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // ——— Public routes ———
      { path: PATHS.home, element: <HomePage /> },
      { path: PATHS.login, element: <LoginPage /> },
      { path: PATHS.verifyOTP, element: <VerifyOTP /> },
      { path: PATHS.register, element: <RegisterPage /> },
      { path: PATHS.forgotPassword, element: <ForgetPassword /> },
      { path: PATHS.resetPassword, element: <ResetPassword /> },
      { path: PATHS.doctors, element: <DoctorsPage /> },

      // ——— Protected routes ———
      {
        element: <ProtectedRoute />,
        children: [
          { path: PATHS.dashboard, element: <DashboardPage /> },
          // Profile
          {
            path: PATHS.profile,
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={PATHS.personalInformation} replace />,
              },
              {
                path: PATHS.passwordManagement,
                element: <PasswordManagement />,
              },
              {
                path: PATHS.personalInformation,
                element: <PersonalInformation />,
              },
            ],
          },

          // book appointment
          { path: PATHS.appointment, element: <AppointmentPage /> },
        ],
      },

      // ——— Catch-all ———
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

/** App router instance consumed by <RouterProvider /> in App.tsx. */
export const router = createBrowserRouter(routes);
