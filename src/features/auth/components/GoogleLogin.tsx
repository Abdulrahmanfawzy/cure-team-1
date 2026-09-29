import { PATHS } from "@/app/router";
import { useAppDispatch } from "@/app/store/hooks";
import { Button } from "@/components/ui/button";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useGoogleAuth } from "../hooks/auth-hooks";
import type { googleLoginPayload } from "../types/auth-types";
import { setAuthenticated } from "../slices/auth-slice";
import { authStorage } from "../utils/auth-storage";

interface GoogleLoginProps {
  mode?: "Sign in";
}

const GoogleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
    />

    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />

    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.7 35.2 27 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 39.4 16.2 44 24 44z"
    />

    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.6 5.5-6.8 6.8l6.3 5.2C38.5 36.3 44 30.7 44 24c0-1.2-.1-2.4-.4-3.5z"
    />
  </svg>
);

function GoogleLogin({ mode }: GoogleLoginProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { google_login: loginWithGoogle } = useGoogleAuth();

  // Success login handle
  const handleGoogleSuccess = (data: typeof loginWithGoogle.data) => {
    if (!data) return;
    // New user
    if ("temp_token" in data.data) {
      navigate(
        `${PATHS.GoogleCompleteRegister}?temp_token=${encodeURIComponent(
          data.data.temp_token,
        )}`,
        { replace: true },
      );
      toast.success(
        "Please enter your phone number to complete your registration.",
      );
      return;
    }

    // Existing Google user
    authStorage.setTokens(data.data.access_token, data.data.raw_refresh_token);
    dispatch(setAuthenticated(true));
    toast.success(data.message);
    navigate(PATHS.home, { replace: true });
  };

  // mutate
  const handleGoogleLogin = (tokenResponse: TokenResponse) => {
    const payload: googleLoginPayload = {
      token: tokenResponse.access_token,
    };

    loginWithGoogle.mutate(payload, {
      onSuccess: (data) => {
        handleGoogleSuccess(data);
      },

      onError: (error) => {
        console.error("Google login error:", error.response);
        toast.error(error.response?.data?.message ?? "Something went wrong.");
      },
    });
  };

  //useGoogleLogin From react-oauth
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("google res", tokenResponse);
      handleGoogleLogin(tokenResponse);
    },

    onError: (error) => {
      console.error("Google OAuth error:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  const isLoading = loginWithGoogle.isPending;

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      disabled={isLoading}
      isLoading={isLoading}
      onClick={() => login()}
      className="flex w-full items-center justify-center gap-1 bg-transparent!"
    >
      <GoogleIcon />
      <span> {`${mode} with Google`}</span>
    </Button>
  );
}

export default GoogleLogin;
