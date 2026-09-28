import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "../paths";
import { useAppSelector } from "@/app/store/hooks";

export function ProtectedRoute(): ReactNode {
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
