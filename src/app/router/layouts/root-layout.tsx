import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function RootLayout(): ReactNode {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <main className="flex-1">
        <Outlet />
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}
