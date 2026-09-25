import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export function RootLayout(): ReactNode {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <div className="relative">
  <Footer />
</div>

      <Toaster
        position="top-right"
        richColors
      />
    </div>
  );
}