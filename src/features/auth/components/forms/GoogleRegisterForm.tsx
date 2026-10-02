import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { googleRegisterPayload } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleRegisterSchema } from "../../schemas/auth-schemas";
import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { useGoogleAuth } from "../../hooks/auth-hooks";
import { PATHS } from "@/app/router";
import { toast } from "sonner";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

function GoogleRegisterForm(): ReactNode {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const temp_token = searchParams.get("temp_token") ?? "";

  if (!temp_token) {
    return <Navigate to={PATHS.login} replace={true} />;
  }

  const { control, handleSubmit, reset } = useForm<googleRegisterPayload>({
    defaultValues: {
      phone: "",
      temp_token: temp_token,
    },
    resolver: zodResolver(googleRegisterSchema),
  });

  const { google_register } = useGoogleAuth();

  // Submit Form
  const submitRegisterForm = (formData: googleRegisterPayload) => {
    google_register.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate(
          `${PATHS.verifyOTP}?type=google-register&phone=${encodeURIComponent(formData.phone)}`,
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
    <form onSubmit={handleSubmit(submitRegisterForm)} className="space-y-4">
      {/* Phone */}
      <FormInput
        control={control}
        label="Phone number"
        name="phone"
        type="text"
        placeholder="Enter your number"
      />

      <Button
        disabled={google_register.isPending}
        type="submit"
        isLoading={google_register.isPending}
        className="w-full"
      >
        Verify Account
      </Button>
    </form>
  );
}

export default GoogleRegisterForm;
