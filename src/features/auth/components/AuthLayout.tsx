import image from "@/assets/images/auth-images/auth-layout.png";
import { HeartPulse } from "lucide-react";
import type { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <section className="flex flex-row items-center">
      <div className="main_contaoner">
        {/* Icon  */}
        <HeartPulse className="fixed top-2 left-3 lg:left-16 lg:top-10 size-8 text-app-primary" />

        {/* Page Content */}
        <div className="flex justify-center items-center min-h-screen">
          <div className=" space-y-8 max-w-md w-full">{children}</div>
        </div>
      </div>

      {/* Shape / Image in The Right */}
      <div className="h-screen -z-10 w-auto hidden fixed right-0 top-0 lg:block">
        <img src={image} className="h-full w-full" />
      </div>
    </section>
  );
}

export default AuthLayout;
