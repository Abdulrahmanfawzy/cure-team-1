import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { forgetPasswordPayloadType } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "../../schemas/auth-schemas";
import FormPassword from "../form-inputs/FormPassword";

function ForgetPassowrdsForm(): ReactNode {
  const { control, handleSubmit } = useForm<forgetPasswordPayloadType>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  const submitForgetPassowrdsForm = (formData: forgetPasswordPayloadType) => {
    console.log(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(submitForgetPassowrdsForm)}
      className="space-y-4"
    >
      {/* Old Password */}
      <FormPassword
        control={control}
        label="Old Password"
        name="oldPassword"
        type="password"
        placeholder="Old Password"
      />

      {/* New Password */}
      <FormPassword
        control={control}
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="New Password"
      />

      {/* Confirm New Password */}
      <FormPassword
        control={control}
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm New Password"
      />

      <Button type="submit" className="w-full">
        Change Password
      </Button>
    </form>
  );
}

export default ForgetPassowrdsForm;
