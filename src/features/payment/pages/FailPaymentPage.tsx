import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function FailPaymentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <CircleX size={42} className="text-red-500" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Payment Failed
        </h1>

        <p className="mt-3 text-gray-500">
          Unfortunately, your payment could not be completed. Please try again.
        </p>

        <div className="mt-6 flex gap-3">
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
