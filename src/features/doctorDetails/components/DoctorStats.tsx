import {
  BriefcaseBusiness,
  MessageSquareText,
  Star,
  UsersRound,
} from "lucide-react";
import type { DoctorDetail } from "../types/doctor-details.types";

interface DoctorStatsProps {
  doctor: DoctorDetail;
}

export function DoctorStats({ doctor }: DoctorStatsProps) {
  const stats = [
    {
      icon: UsersRound,
      value: doctor.patients,
      label: "patients",
    },
    {
      icon: BriefcaseBusiness,
      value: doctor.experience,
      label: "experience",
    },
    {
      icon: Star,
      value: doctor.rating.toString(),
      label: "rating",
    },
    {
      icon: MessageSquareText,
      value: doctor.reviews,
      label: "reviews",
    },
  ];

  return (
    <div className="mt-5 flex">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="w-14 min-h-24.5 flex flex-1 flex-col flex-wrap items-center 
          gap-x-6 text-center"
        >
          <span
            className="flex size-14 items-center justify-center 
          rounded-full bg-white text-app-secondary"
          >
            <Icon size={30} />
          </span>

          <span className="text-[14px] font-medium text-app-secondary">
            {value}
          </span>

          <span className="text-[14px] text-app-neutral-darker text-wrap">{label}</span>
        </div>
      ))}
    </div>
  );
}
