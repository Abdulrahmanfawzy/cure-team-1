import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { DoctorDetail } from "../types/doctor-details.types";

interface DoctorProfileHeaderProps {
  doctor: DoctorDetail;
}

export function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
  return (
    <div className="relative text-center">
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute left-0 top-0  rounded-full bg-white"
        aria-label="Add doctor to favorites"
      >
        <Heart className="size-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-0 top-0 rounded-full bg-white"
        aria-label="Message doctor"
      >
        <MessageCircle className="size-6" />
      </Button>

      <Avatar className="mx-auto size-27">
        <AvatarImage src={doctor.image} alt={doctor.name} />

        <AvatarFallback>JT</AvatarFallback>
      </Avatar>

      <h2 className="mt-3 text-[20px] font-medium text-app-secondary">
        {doctor.name}
      </h2>

      <p className="mt-1 text-[14px] text-app-neutral-darker">
        {doctor.specialty}
      </p>
    </div>
  );
}
