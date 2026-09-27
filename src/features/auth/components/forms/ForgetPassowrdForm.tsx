import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { forgetPasswordPayloadType } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "../../schemas/auth-schemas";
import { FormInput } from "../../../../components/shared/common/form-inputs/FormInput";
import { PATHS } from "@/app/router";
import { Link } from "react-router-dom";

function ForgetPassowrdsForm(): ReactNode {
  const { control, handleSubmit } = useForm<forgetPasswordPayloadType>({
    defaultValues: {
      phone: "",
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
      {/* Phone */}
      <FormInput
        control={control}
        label="Phone Number"
        name="phone"
        type="text"
        placeholder="Enter your phone number"
      />

      <Button type="submit" className="w-full">
        Continue
      </Button>

      <p className="text-center text-sm text-app-neutral">
        Remember your password?{" "}
        <Link
          to={PATHS.login}
          className="text-app-primary bg-transparent! font-medium hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}

export default ForgetPassowrdsForm;
