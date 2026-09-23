import { PATHS } from "@/app/router";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GoogleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.7 35.2 27 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.5 39.4 16.2 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.6 5.5-6.8 6.8l6.3 5.2C38.5 36.3 44 30.7 44 24c0-1.2-.1-2.4-.4-3.5z"
    />
  </svg>
);

interface FormFooterProps {
  mode: "Sign in" | "Sign up";
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
        <div className="h-px flex-1 bg-[#b9c0c8]" />

        <span className="text-base leading-none text-app-neutral">or</span>

        <div className="h-px flex-1 bg-[#b9c0c8]" />
      </div>

      {/* Google Button */}
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="flex w-full items-center justify-center gap-4"
      >
        <GoogleIcon />
        <span>{mode} with Google</span>
      </Button>

      {/* Switch Auth */}
      <div className="flex items-center justify-center">
        <span className="text-app-neutral text-sm font-medium">
          {switchText}
        </span>

        <Link to={switchPath}>
          <Button
            type="button"
            variant="link"
            className="text-app-primary px-1 py-0 text-sm"
          >
            {switchLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FormFooter;
