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
import ProfileLayout from "@/features/profile/pages/ProfileLayout";
// import PasswordManagement from "@/features/profile/pages/PasswordManagement";
import PersonalInformation from "@/features/profile/pages/PersonalInformation";
import DoctorsPage from "@/features/doctors/pages/DoctorsPage";
import DoctorDetailsPage from "@/features/doctorDetails/pages/DoctorDetailsPage";
import AppointmentPage from "@/features/appointment/pages/AppointmentPage";
import BookPage from "@/features/book/pages/BookPage";
import ContactPage from "@/features/contact/pages/contact-page";
import VerifyPage from "./pages/verify-page";
import MainLayout from "./layouts/main-layout";
import AuthGuard from "./layouts/auth-guard";
import GoogleCompleteRegister from "@/features/auth/pages/GoogleCompleteRegister";
import AuthLayout from "./layouts/auth-layout";
import ChatPage from "@/features/chat/pages/ChatPage";

// const routes: RouteObject[] = [
//   {
//     element: <RootLayout />,
//     children: [
//       // main Content Layout
//       {
//         element: <MainLayout />,
//         children: [
//           // ——— Public routes ———
//           { path: PATHS.home, element: <HomePage /> },
//           { path: PATHS.doctors, element: <DoctorsPage /> },
//           { path: PATHS.doctorDetails, element: <DoctorDetailsPage /> },

//           // ——— Protected routes ———
//           {
//             element: <ProtectedRoute />,
//             children: [
//               { path: PATHS.dashboard, element: <DashboardPage /> },
//               // Profile
//               {
//                 path: PATHS.profile,
//                 element: <ProfileLayout />,
//                 children: [
//                   {
//                     index: true,
//                     element: (
//                       <Navigate to={PATHS.personalInformation} replace />
//                     ),
//                   },
//                   // {
//                   //   path: PATHS.passwordManagement,
//                   //   element: <PasswordManagement />,
//                   // },
//                   {
//                     path: PATHS.personalInformation,
//                     element: <PersonalInformation />,
//                   },
//                 ],
//               },

//               // book appointment
//               { path: PATHS.appointment, element: <AppointmentPage /> },
//               // book
//               {
//                 path: PATHS.book,
//                 element: <BookPage />,
//               },
//             ],
//           },

//           {
//             path: PATHS.contact,
//             element: <ContactPage />,
//           },

//           // ——— Catch-all ———
//           { path: "*", element: <NotFoundPage /> },
//         ],
//       },

//       // Auth Layout
//       {
//         element: <AuthLayout />,
//         children: [
//           { path: PATHS.login, element: <LoginPage /> },
//           { path: PATHS.verifyOTP, element: <VerifyPage /> },
//           { path: PATHS.register, element: <RegisterPage /> },
//         ],
//       },
//     ],
//   },
// ];
const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Public routes
          { path: PATHS.home, element: <HomePage /> },
          { path: PATHS.doctors, element: <DoctorsPage /> },
          { path: PATHS.doctorDetails, element: <DoctorDetailsPage /> },

          // Protected routes
          {
            element: <ProtectedRoute />,
            children: [
              { path: PATHS.dashboard, element: <DashboardPage /> },

              {
                path: PATHS.profile,
                element: <ProfileLayout />,
                children: [
                  {
                    index: true,
                    element: (
                      <Navigate to={PATHS.personalInformation} replace />
                    ),
                  },
                  {
                    path: PATHS.personalInformation,
                    element: <PersonalInformation />,
                  },
                ],
              },

              {
                path: PATHS.appointment,
                element: <AppointmentPage />,
              },

              {
                path: PATHS.book,
                element: <BookPage />,
              },
              {
                path: PATHS.chat,
                element: <ChatPage />,
              },
            ],
          },

          {
            path: PATHS.contact,
            element: <ContactPage />,
          },

          { path: "*", element: <NotFoundPage /> },
        ],
      },

      //  Auth routes
      {
        element: <AuthGuard />,
        children: [
          { path: PATHS.login, element: <LoginPage /> },
          { path: PATHS.register, element: <RegisterPage /> },
          { path: PATHS.verifyOTP, element: <VerifyPage /> },
          {
            path: PATHS.GoogleCompleteRegister,
            element: <GoogleCompleteRegister />,
          },
        ],
      },
    ],
  },
];
/** App router instance consumed by <RouterProvider /> in App.tsx. */
export const router = createBrowserRouter(routes);
