import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth-schemas";
import type { registerPayloadtype } from "../../types/auth-types";
import { FormInput } from "@/components/shared/common/form-inputs/FormInput";

function RegisterForm(): ReactNode {
  const { control, handleSubmit } = useForm<registerPayloadtype>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const submitRegisterForm = (formData: registerPayloadtype) => {
    console.log(formData);
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

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <FormFooter mode="Sign up" />
    </form>
  );
}

export default RegisterForm;
