import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { StoreProvider } from "./store-provider";
import { Toaster } from "react-hot-toast";

/**
 * AppProviders
 *
 * Composes every global provider in one place. Order matters:
 * 1. StoreProvider  — Redux (client/global state)
 * 2. QueryProvider  — TanStack React Query (server state)
 * 3. (Future) ThemeProvider, RouterProvider, etc.
 *
 * Mounted once in `main.tsx`.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  );
}
