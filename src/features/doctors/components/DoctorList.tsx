import type { Doctor } from "../types/doctor.types";
import { DoctorCard } from "./DoctorCard";

interface DoctorListProps {
  doctors: Doctor[];
}

export function DoctorList({ doctors }: DoctorListProps) {
  if (!doctors.length) {
    return (
      <div
        className="flex min-h-75 items-center justify-center text-sm 
      text-app-neutral-darker"
      >
        No doctors found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
