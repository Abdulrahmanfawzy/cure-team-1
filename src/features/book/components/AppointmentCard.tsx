import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import StatusLabel from "./StatusLabel";
import AppointmentActions from "./AppointmentActions";
type AppointmentStatus = "Upcoming" | "Completed" | "Canceled";
type Appointment = {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  address: string;
  image: string;
  status: AppointmentStatus;
};
type AppointmentCardProps = {
  appointment: Appointment;
};

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { status } = appointment;

  return (
    <Card
      className="
        w-full
        overflow-hidden
        rounded-3xl
        border-app-lighter
        bg-white
        shadow-none
        pb-2
      "
    >
      <CardContent className="p-4.25">
        {/* ================= CARD TOP ================= */}
        <div className="flex items-center justify-between gap-3">
          {/* Date */}
          <div className="flex min-w-0 items-center gap-2 text-sm text-app-secondary">
            <CalendarDays
              size={19}
              strokeWidth={1.7}
              className="shrink-0 text-app-secondary"
            />

            <span className="truncate">
              {appointment.date} - {appointment.time}
            </span>
          </div>

          {/* Status */}
          <StatusLabel status={status} />
        </div>

        {/* Divider */}
        <div className="my-3 h-px w-full bg-gray-300" />

        {/* ================= DOCTOR ================= */}
        <div className="flex items-center gap-3">
          {/* Doctor Image */}
          <img
            src={appointment.image}
            alt={appointment.doctor}
            className="
              h-12
              w-12
              shrink-0
              rounded-full
              object-cover
            "
          />

          {/* Doctor Info */}
          <div className="min-w-0">
            <h3 className="font-montserrat  text-lg leading-6 ">
              {appointment.doctor}
            </h3>

            <p className="mt-0.5 text-base text-app-neutral-darker">
              {appointment.specialty}
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

          <span>{appointment.address}</span>
        </div>

        {/* ================= ACTIONS ================= */}
        <AppointmentActions status={status} />
      </CardContent>
    </Card>
  );
}
