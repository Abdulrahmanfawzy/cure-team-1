import { useParams } from "react-router-dom";

import PaymentModal from "../components/PaymentModal";
import useGetSpecificBook from "@/features/book/hook/useGetSpecificBook";
import LoaderPage from "@/features/appointment/components/LoaderPage";

export default function PaymentPage() {
  const { bookingId } = useParams();

  const { data, isLoading, isError } = useGetSpecificBook(bookingId!);

  if (isLoading) {
    return <LoaderPage />;
  }

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load booking data</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="mx-auto max-w-[470px]">
        <p className="mb-2 text-sm text-gray-400">Payment</p>

        <PaymentModal data={data.data} />
      </div>
    </main>
  );
}
