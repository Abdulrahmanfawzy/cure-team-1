import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import type { loginPayload } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth-schemas";
import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { useAuth } from "../../hooks/auth-hooks";
import { PATHS } from "@/app/router";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function LoginForm(): ReactNode {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<loginPayload>({
    defaultValues: {
      phone: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const submitLoginForm = (formData: loginPayload) => {
    login.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate(
          `${PATHS.verifyOTP}?type=login&phone=${encodeURIComponent(formData.phone)}`,
        );
        reset();
      },
      onError: (error) => {
        console.error(error.response);
        toast.error(error.response?.data?.message);
      },
    });
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

      <Button
        isLoading={login.isPending}
        disabled={login.isPending}
        type="submit"
        className="w-full"
      >
        Sign In
      </Button>

      <FormFooter mode="Sign in" />
    </form>
  );
}

export default LoginForm;
