import type { ReactNode } from "react";
import AuthLayout from "../components/AuthLayout";
import FormHeader from "../components/FormHeader";
import LoginForm from "../components/forms/LoginForm";

function Login(): ReactNode {
  return (
    <AuthLayout>
      {/* header */}
      <FormHeader
        description="Please Enter your phone number"
        title="Sign In"
      />

      {/* Form */}
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
