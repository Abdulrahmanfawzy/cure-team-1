import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { StoreProvider } from "./store-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <StoreProvider>
        <QueryProvider>{children}</QueryProvider>
      </StoreProvider>
    </GoogleOAuthProvider>
  );
}
