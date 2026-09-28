import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth-schemas";
import type { registerPayload } from "../../types/auth-types";
import { FormInput } from "@/components/shared/common/form-inputs/FormInput";
import { useAuth } from "../../hooks/auth-hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/app/router";

function RegisterForm(): ReactNode {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<registerPayload>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { register } = useAuth();

  const submitRegisterForm = (formData: registerPayload) => {
    register.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate(`${PATHS.verifyOTP}?type=register&phone=${formData.phone}`);
        reset();
      },
      onError: (error) => {
        console.log(error.response);
        toast.error(error.response?.data?.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitRegisterForm)} className="space-y-4">
      {/* Name */}
      <FormInput
        control={control}
        label="Full Name"
        name="name"
        type="text"
        placeholder="Full Name"
      />

      {/* Email */}
      <FormInput
        control={control}
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
      />

      {/* Phone */}
      <FormInput
        control={control}
        name="phone"
        label="Phone number"
        type="text"
        placeholder="Enter your number"
      />

      <Button disabled={register.isPending} type="submit" className="w-full">
        {register.isPending ? "Loading..." : "Sign Up"}
      </Button>

      <FormFooter mode="Sign up" />
    </form>
  );
}

export default RegisterForm;
