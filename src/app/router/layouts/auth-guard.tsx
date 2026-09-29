import { useAppSelector } from "@/app/store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../paths";

function AuthGuard() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATHS.home} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
