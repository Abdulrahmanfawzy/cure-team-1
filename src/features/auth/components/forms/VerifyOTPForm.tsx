import { PATHS } from "@/app/router";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldError } from "@/components/ui/field";
import type { verifyOtpPayloadType } from "../../types/auth-types";
import { verifyOtpSchema } from "../../schemas/auth-schemas";

function VerifyOTPForm(): ReactNode {
  const [otpTimeInvalid, setOtpTimeInvalid] = useState(60);

  const { control, handleSubmit } = useForm<verifyOtpPayloadType>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  const submitVerifyOtpForm = (formData: verifyOtpPayloadType) => {
    console.log(formData);
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
          name="otp"
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
            className="text-app-info text-sm"
            onClick={() => setOtpTimeInvalid(60)}
          >
            Resend
          </Button>
          <span className="text-sm text-app-neutral">OR</span>
          <Link to={PATHS.register}>
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

      <Button type="submit" className="w-full">
        Verify
      </Button>
    </form>
  );
}

export default VerifyOTPForm;
