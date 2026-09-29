import { PATHS } from "@/app/router";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

interface FormFooterProps {
  mode?: "Sign in";
}

function FormFooter({ mode }: FormFooterProps) {
  const isSignIn = mode === "Sign in";

  const switchPath = isSignIn ? PATHS.register : PATHS.login;
  const switchLabel = isSignIn ? "Sign up" : "Sign in";
  const switchText = isSignIn
    ? "Don't have an account?"
    : "Already have an account?";

  return (
    <div className="w-full space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-app-neutral" />

        <span className="text-base leading-none text-app-neutral">or</span>

        <div className="h-px flex-1 bg-app-neutral" />
      </div>

      {/* Google Button */}
      {mode === "Sign in" && <GoogleLogin mode={mode} />}
      {/* Switch Auth */}
      <div className="flex items-center justify-center">
        <span className="text-app-neutral text-sm font-medium">
          {switchText}
        </span>

        <Link className="bg-transparent!" to={switchPath}>
          <Button
            type="button"
            variant="link"
            className="text-app-primary bg-transparent! px-1 py-0 text-sm"
          >
            {switchLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FormFooter;
