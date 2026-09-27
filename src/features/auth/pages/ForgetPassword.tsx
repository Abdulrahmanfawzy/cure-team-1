import AuthLayout from "../components/AuthLayout";
import ForgetPassowrdsForm from "../components/forms/ForgetPassowrdForm";
import FormHeader from "../components/FormHeader";

function ForgetPassword() {
  return (
    <AuthLayout>
      <FormHeader
        title="Forget Password"
        description="Enter Your Phone Number to Reset Your Password"
      />
      <ForgetPassowrdsForm />
    </AuthLayout>
  );
}

export default ForgetPassword;
