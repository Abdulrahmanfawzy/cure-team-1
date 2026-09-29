import Login from "@/features/auth/pages/Login";
import type { ReactNode } from "react";

/**
 * Login page placeholder (public route).
 *
 * TODO — implement the real auth UI inside `features/auth`:
 * - React Hook Form + zodResolver with schema from `features/auth/schemas`
 * - shadcn Form + Input + Button components
 * - Submit via feature mutation hook from `features/auth/hooks`
 *
 * Then re-export the real page from `features/auth` and wire it here.
 */
export function LoginPage(): ReactNode {
  return <Login />;
}
