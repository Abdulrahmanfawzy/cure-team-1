import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function SuccessPaymentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={42} className="text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Payment Successful
        </h1>

        <p className="mt-3 text-gray-500">
          Your payment has been completed successfully.
        </p>

        <Link to="/">
          <Button className="mt-6 w-full">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
