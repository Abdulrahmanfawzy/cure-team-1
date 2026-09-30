import { CalendarDays, CheckCircle2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePayment } from "../hooks/usePayment";
import { type SpecificAppointmentData } from "@/features/book/types/book.types";
import { formatDateAppointment } from "@/features/appointment/lib/format";

export default function PaymentModal({
  data,
}: {
  data: SpecificAppointmentData;
}) {
  const paymentMutation = usePayment();

  const handlePayment = () => {
    paymentMutation.mutate(
      {
        booking_id: data.id,
      },
      {
        onSuccess: (response) => {
          // Redirect user to Stripe Checkout
          window.location.href = response.data.url;
        },
      },
    );
  };

  return (
    <div className="w-full max-w-[470px] rounded-2xl bg-white p-8 shadow-sm">
      {/* Doctor Information */}
      <div className="flex items-center gap-5">
        {data.doctor.image ? (
          <img
            src={"http://round-13-cure.huma-volve.com/" + data.doctor.image}
            alt={data.doctor.name}
            className="h-28 w-28 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
            <span className="text-2xl text-gray-400">👨‍⚕️</span>
          </div>
        )}

        <div className="min-w-0">
          <h2 className="font-serif text-xl text-app-primary">
            {data.doctor.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{data.doctor.specialist}</p>

          <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-500">
            <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />

            <span>
              {data.doctor.lat},{data.doctor.long}
            </span>
          </div>
        </div>
      </div>

      {/* Appointment */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-app-primary">
          <CalendarDays size={19} className="text-blue-600" />

          <span>
            {formatDateAppointment(data.date).fullDate} -{" "} {data.time.slice(0, 5)} 
          </span>
        </div>
      </div>

      {/* Payment */}
      <div className="mt-8">
        <h3 className="font-serif text-xl text-app-primary">Payment Method</h3>

        {/* Stripe Payment */}
        <div className="mt-5 rounded-xl bg-blue-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <h4 className="font-medium text-app-primary">Secure Payment</h4>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                You will be redirected to Stripe to securely complete your
                payment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-8 flex items-end justify-between">
        <div className="flex items-end">
          <span className="text-2xl font-medium text-app-primary">Price</span>

          <span className="mb-1 ml-1 text-xs text-gray-400">/hour</span>
        </div>

        <span className="text-base text-red-500">
          {/* doctor not contain price */}
          {data.doctor?.price ? data.doctor.price : 200}$
        </span>
      </div>

      {/* Error */}
      {paymentMutation.isError && (
        <p className="mt-3 text-center text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Pay */}
      <Button
        type="button"
        onClick={handlePayment}
        disabled={paymentMutation.isPending}
        className="mt-4 h-12 w-full rounded-xl bg-blue-600 text-base font-medium text-white shadow-md transition hover:bg-blue-700"
      >
        {paymentMutation.isPending ? "Redirecting to Stripe..." : "Pay"}
      </Button>
    </div>
  );
}
