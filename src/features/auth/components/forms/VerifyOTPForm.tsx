import { PATHS } from "@/app/router";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldError } from "@/components/ui/field";
import type {
  resendOtpPayload,
  verifyOtpPayload,
} from "../../types/auth-types";
import { verifyOtpSchema } from "../../schemas/auth-schemas";
import { useAuth, useGoogleAuth } from "../../hooks/auth-hooks";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hooks";
import { setAuthenticated } from "../../slices/auth-slice";
import { authStorage } from "../../utils/auth-storage";

// Code Otp
const otp_code = "1234";

function VerifyOTPForm(): ReactNode {
  // Get Data From URL
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const type = searchParams.get("type") ?? "";

  // Protected
  if (!phone || !type) {
    return <Navigate to={PATHS.login} replace />;
  }

  // Set code time invalid
  const [otpTimeInvalid, setOtpTimeInvalid] = useState(60);

  const navigate = useNavigate();

  const appDispatch = useAppDispatch();

  // React Hook form
  const { control, handleSubmit, setError, reset } = useForm<verifyOtpPayload>({
    defaultValues: {
      code: "",
      phone: phone,
      type: type,
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  const { verify_register, verify_login, resend_otp } = useAuth();
  const { google_verify } = useGoogleAuth();

  // Verify states
  const submitVerifyOtpForm = (formData: verifyOtpPayload) => {
    if (formData.code === otp_code) {
      // Verify Register
      if (formData.type === "register") {
        verify_register.mutate(formData, {
          onSuccess: (data) => {
            toast.success(data.message);
            // add token to local storage
            authStorage.setTokens(
              data.data.access_token,
              data.data.raw_refresh_token,
              data.data.refresh_token_expires_at,
              data.data.access_token_expires_at,
            );
            appDispatch(setAuthenticated(true));
            navigate(PATHS.home);
            reset();
          },
          onError: (error) => {
            console.error(error.response);
            toast.error(error.response?.data?.message);
          },
        });
      }

      // Verify Login
      if (formData.type === "login") {
        verify_login.mutate(formData, {
          onSuccess: (data) => {
            toast.success(data.message);
            // add token to local storage
            authStorage.setTokens(
              data.data.access_token,
              data.data.raw_refresh_token,
              data.data.refresh_token_expires_at,
              data.data.access_token_expires_at,
            );
            appDispatch(setAuthenticated(true));
            navigate(PATHS.home);
            reset();
          },
          onError: (error) => {
            console.error(error.response);
            toast.error(error.response?.data?.message);
          },
        });
      }

      // Verify google
      if (formData.type === "google-register") {
        google_verify.mutate(formData, {
          onSuccess: (data) => {
            toast.success(data.message);
            // add token to local storage
            authStorage.setTokens(
              data.data.access_token,
              data.data.raw_refresh_token,
              data.data.refresh_token_expires_at,
              data.data.access_token_expires_at,
            );
            appDispatch(setAuthenticated(true));
            navigate(PATHS.home);
            reset();
          },
          onError: (error) => {
            console.error(error.response);
            toast.error(error.response?.data?.message);
          },
        });
      }
    } else {
      setError("code", {
        message: "Code is not Correct",
      });
    }
  };

  const handle_resend_otp = () => {
    if (phone && type) {
      const payload: resendOtpPayload = { type: type, phone: phone };
      resend_otp.mutate(payload, {
        onSuccess: (data) => {
          toast.success(data.message);
          setOtpTimeInvalid(60);
        },
        onError: (error) => {
          console.error(error.response);
          toast.error(error.response?.data?.message);
        },
      });
    }
  };

  useEffect(() => {
    if (otpTimeInvalid > 0) {
      const timer = setInterval(() => {
        setOtpTimeInvalid((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpTimeInvalid]);

  return (
    <form
      onSubmit={handleSubmit(submitVerifyOtpForm)}
      className="flex flex-col items-center gap-7"
    >
      <div className="flex flex-col items-center gap-2">
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <InputOTP
                maxLength={4}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} aria-invalid={!!fieldState.error} />
                  <InputOTPSlot index={1} aria-invalid={!!fieldState.error} />
                  <InputOTPSlot index={2} aria-invalid={!!fieldState.error} />
                  <InputOTPSlot index={3} aria-invalid={!!fieldState.error} />
                </InputOTPGroup>
              </InputOTP>

              {fieldState.error && (
                <FieldError>{fieldState?.error?.message}</FieldError>
              )}
            </>
          )}
        />
      </div>

      {otpTimeInvalid == 0 ? (
        // Resend Code OR Change Phone Number Actions
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant={"link"}
            isLoading={resend_otp.isPending}
            disabled={resend_otp.isPending}
            className="text-app-info text-sm"
            onClick={() => handle_resend_otp()}
          >
            Resend
          </Button>
          <span className="text-sm text-app-neutral">OR</span>
          <Link
            to={
              searchParams.get("type") === "login"
                ? PATHS.login
                : PATHS.register
            }
          >
            <Button
              type="button"
              variant={"link"}
              className="text-app-info text-sm"
            >
              Enter anther phone number
            </Button>
          </Link>
        </div>
      ) : (
        // Resend Code Timer
        <div className="flex items-center text-app-secondary justify-center text-sm gap-1">
          <span>
            Resend code in
            <span className="text-app-info"> {otpTimeInvalid} s</span>
          </span>
        </div>
      )}

      <Button
        disabled={
          verify_register.isPending ||
          verify_login.isPending ||
          google_verify.isPending
        }
        isLoading={
          verify_register.isPending ||
          verify_login.isPending ||
          google_verify.isPending
        }
        type="submit"
        className="w-full"
      >
        Verify
      </Button>
    </form>
  );
}

export default VerifyOTPForm;
