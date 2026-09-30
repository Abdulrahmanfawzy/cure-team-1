import { PATHS } from "@/app/router";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderAppointment() {
  return (
    <div className="mb-5 flex items-center gap-3">
      <Link
        to={PATHS.doctors}
        className="flex items-center gap-3 hover:bg-transparent"
      >
        <ArrowLeft size={21} strokeWidth={1.8} />

        <h1 className="text-2xl font-noto-serif-georgian">
          Make an appointment
        </h1>
      </Link>
    </div>
  );
}
