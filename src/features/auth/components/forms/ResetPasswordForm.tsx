import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { resetPasswordPayloadType } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";

import { PATHS } from "@/app/router";
import { Link } from "react-router-dom";
import FormPassword from "../form-inputs/FormPassword";
import { resetPasswordSchema } from "../../schemas/auth-schemas";

function ResetPasswordForm(): ReactNode {
  const { control, handleSubmit } = useForm<resetPasswordPayloadType>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const submitResetPasswordForm = (formData: resetPasswordPayloadType) => {
    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(submitResetPasswordForm)}
      className="space-y-4"
    >
      {/*  New Password */}
      <FormPassword
        control={control}
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="Enter your new password"
      />

      {/*  Confirm New Password */}
      <FormPassword
        control={control}
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        placeholder="Enter your confirm new password"
      />

      <Button type="submit" className="w-full">
        Change Password
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
