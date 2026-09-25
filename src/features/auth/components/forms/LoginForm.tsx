import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import type { loginPayloadType } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth-schemas";
import { FormInput } from "@/components/shared/common/form-inputs/FormInput";

function LoginForm(): ReactNode {
  const { control, handleSubmit } = useForm<loginPayloadType>({
    defaultValues: {
      phone: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const submitLoginForm = (formData: loginPayloadType) => {
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitLoginForm)} className="space-y-4">
      {/* Phone */}
      <FormInput
        control={control}
        label="Phone number"
        name="phone"
        type="text"
        placeholder="Enter your number"
      />

      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <FormFooter mode="Sign in" />
    </form>
  );
}

export default LoginForm;
