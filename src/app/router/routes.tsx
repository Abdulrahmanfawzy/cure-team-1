import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./guards/protected-route";
import { RootLayout } from "./layouts/root-layout";
import { PATHS } from "./paths";

import { DashboardPage } from "./pages/dashboard-page";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { NotFoundPage } from "./pages/not-found-page";
import { RegisterPage } from "./pages/register-page";

import ContactPage from "@/features/contact/pages/contact-page";

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.home,
        element: <HomePage />,
      },

      {
        path: PATHS.login,
        element: <LoginPage />,
      },

      {
        path: PATHS.register,
        element: <RegisterPage />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.dashboard,
            element: <DashboardPage />,
          },
        ],
      },

      {
        path: PATHS.contact,
        element: <ContactPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);