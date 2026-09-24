import {
  Brain,
  Eye,
  HeartPulse,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";
import type { Specialty } from "../types/doctor.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SpecialtyFilterProps {
  specialties: Specialty[];
  selectedSpecialty: number | null;
  onSpecialtyChange: (id: number | null) => void;
}

const icons = [
  Stethoscope,
  HeartPulse,
  Waves,
  Brain,
  Stethoscope,
  Eye,
  Syringe,
];

export function SpecialtyFilters({
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
}: SpecialtyFilterProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {specialties.map((specialty, index) => {
          const Icon = icons[index % icons.length];

          return (
            <CarouselItem key={specialty.id} className="basis-auto">
              <button
                type="button"
                onClick={() => onSpecialtyChange(specialty.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg border px-5 
            py-3 ${
              selectedSpecialty === specialty.id
                ? "border-app-primary bg-app-primary text-white"
                : "border-app-neutral-lighter bg-white"
            }`}
              >
                <Icon className="h-4 w-4" />
                <span>{specialty.name}</span>
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
