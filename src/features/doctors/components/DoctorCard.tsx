import { Clock3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Doctor } from "../types/doctor.types";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className="overflow-hidden shadow-lg p-4  rounded-md">
      <div className="flex gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-22 w-24.5 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-noto-serif-georgian text-[16px] font-medium text-app-secondary">
            {doctor.name}
          </h3>

          <p className="mt-1 truncate text-sm text-app-neutral-darker">
            {doctor.specialty} | {doctor.hospital}
          </p>

          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star size={17} fill="currentColor" className="text-app-gold" />
              <span>{doctor.rating}</span>
            </span>

            <span className="flex items-center gap-1">
              <Clock3 size={16} className="text-app-neutral-darker" />
              {doctor.availableTime}
            </span>
          </div>
        </div>
      </div>

      <div className="my-2 border-t border-app-neutral-lightest" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-app-secondary">Price/hour</span>

        <span className="text-app-error">${doctor.price}</span>
      </div>

      <Button className="mt-2 h-12 w-full rounded-lg">Book appointment</Button>
    </article>
  );
}
