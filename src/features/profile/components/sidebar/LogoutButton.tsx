import { PATHS } from "@/app/router";
import { useAppDispatch } from "@/app/store/hooks";
import { useAuth } from "@/features/auth/hooks/auth-hooks";
import { setAuthenticated } from "@/features/auth/slices/auth-slice";
import type { logoutPayload } from "@/features/auth/types/auth-types";
import { authStorage } from "@/features/auth/utils/auth-storage";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Get refresh_token from localStorage
    const refresh_token: logoutPayload = {
      refresh_token: authStorage.getRefreshToken() ?? "",
    };

    if (refresh_token === undefined) return;
    console.log("logout comp", refresh_token);
    logout.mutate(refresh_token, {
      onSuccess: (data) => {
        navigate(PATHS.login, { replace: true });
        toast.success(data.message);
        authStorage.clear();
        dispatch(setAuthenticated(false));
      },
      onError: (error) => {
        console.log(error.response);
        toast.error(error.response?.data?.message);
      },
    });
  };

  if (logout.isPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
          <span>Logging out...</span>
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={handleLogout}
      className="flex cursor-pointer items-center gap-2 text-app-error  pr-4 pl-3 h-12 rounded-md text-base"
    >
      <LogOutIcon size={24} />
      <span>Log out</span>
    </button>
  );
}

export default LogoutButton;
