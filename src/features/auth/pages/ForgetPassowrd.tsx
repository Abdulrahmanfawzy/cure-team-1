import AuthLayout from "../components/AuthLayout";
import ForgetPassowrdsForm from "../components/forms/ForgetPassowrdsForm";
import FormHeader from "../components/FormHeader";

function ForgetPassowrd() {
  return (
    <AuthLayout>
      <FormHeader
        title="Change Password"
        description="Enter your old and new passwords to update your password."
      />
      <ForgetPassowrdsForm />
    </AuthLayout>
  );
}

export default ForgetPassowrd;
