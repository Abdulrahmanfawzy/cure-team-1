import AuthLayout from "../components/AuthLayout";

import FormHeader from "../components/FormHeader";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

function ResetPassword() {
  return (
    <AuthLayout>
      <FormHeader
        title="Forget Password"
        description="Enter Your Phone Number to Reset Your Password"
      />
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPassword;
