import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import type { loginPayloadType } from "../../types/auth-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth-schemas";
import { Link } from "react-router-dom";
import { PATHS } from "@/app/router";
import { FormInput } from "../form-inputs/FormInput";
import FormPassword from "../form-inputs/FormPassword";

function LoginForm(): ReactNode {
  const { control, handleSubmit } = useForm<loginPayloadType>({
    defaultValues: {
      phone: "",
      password: "",
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

      {/* Password And Forget Password Button */}
      <div>
        {/* Password */}
        <FormPassword
          control={control}
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />

        {/* Forget Password Button */}
        <Link to={PATHS.forgotPassword}>
          <Button className="text-app-info px-0" variant={"link"}>
            Forget Password
          </Button>
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <FormFooter mode="Sign in" />
    </form>
  );
}

export default LoginForm;
