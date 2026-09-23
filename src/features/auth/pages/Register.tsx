import type { ReactNode } from "react";
import AuthLayout from "../components/AuthLayout";
import FormHeader from "../components/FormHeader";
import RegisterForm from "../components/forms/RegisterForm";

function Register(): ReactNode {
  return (
    <AuthLayout>
      {/* header */}
      <FormHeader
        description="Please provide all information required to create your account"
        title="Sign Up"
      />

      {/* Form */}
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
