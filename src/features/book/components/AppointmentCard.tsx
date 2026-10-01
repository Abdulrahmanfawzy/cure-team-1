import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";

import StatusLabel from "./StatusLabel";
import AppointmentActions from "./AppointmentActions";
import type { Appointment } from "../types/book.types";
import { formatDateAppointment } from "@/features/appointment/lib/format";

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { date, time, status, doctor } = appointment;

  return (
    <Card
      className="
        w-full
        overflow-hidden
        rounded-3xl
        border-app-lighter
        bg-white
        shadow-none
      "
    >
      <CardContent className="p-4.25">
        {/* ================= DATE + STATUS ================= */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-sm text-app-secondary">
            <CalendarDays
              size={19}
              strokeWidth={1.7}
              className="shrink-0 text-app-secondary"
            />

            <span className="truncate">
              {/* {date} - {time} */}
              {formatDateAppointment(date).dayName +
                " , " +
                formatDateAppointment(date).month +
                " - " +
                time}
            </span>
          </div>

          <StatusLabel status={status} />
        </div>

        {/* ================= DIVIDER ================= */}

        <div className="my-3 h-px w-full bg-gray-300" />

        {/* ================= DOCTOR ================= */}

        <div className="flex items-center gap-3">
          <img
            src={doctor.doctor_image}
            alt={doctor.doctor_name}
            className="
              h-12
              w-12
              shrink-0
              rounded-full
              object-cover
            "
          />

          <div className="min-w-0">
            <h3 className="font-montserrat text-lg leading-6">
              {doctor.doctor_name}
            </h3>

            <p className="mt-0.5 text-base text-app-neutral-darker">
              {doctor.specialist}
            </p>
          </div>
        </div>

        {/* ================= LOCATION ================= */}

        <div className="mt-3 flex items-center gap-2 text-base text-app-neutral-darker">
          <MapPin
            size={19}
            strokeWidth={1.7}
            className="shrink-0 text-app-neutral-darker"
          />

          <span>
            {doctor.latitude}, {doctor.longitude}
          </span>
        </div>

        {/* ================= ACTIONS ================= */}

        <AppointmentActions
          status={status}
          bookingId={appointment.id}
        />
      </CardContent>
    </Card>
  );
}
