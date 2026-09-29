import type { ReactNode } from "react";
import AuthLayout from "../components/AuthLayout";
import FormHeader from "../components/FormHeader";
import GoogleRegisterForm from "../components/forms/GoogleRegisterForm";

function GoogleCompleteRegister(): ReactNode {
  return (
    <AuthLayout>
      {/* header */}
      <FormHeader
        description="Please Enter your phone number, to verify your Phone Number"
        title="Verify Phone Number"
      />

      {/* Form */}
      <GoogleRegisterForm />
    </AuthLayout>
  );
}

export default GoogleCompleteRegister;
