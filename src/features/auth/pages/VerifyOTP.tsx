import AuthLayout from "../components/AuthLayout";
import FormHeader from "../components/FormHeader";
import VerifyOTPForm from "../components/forms/VerifyOTPForm";

function VerifyOTP() {
  return (
    <>
      <AuthLayout>
        <FormHeader
          slug="Check your phone number"
          title="Code Verification"
          description="Code has been send to your phone number"
        />
        <VerifyOTPForm />
      </AuthLayout>
    </>
  );
}

export default VerifyOTP;
