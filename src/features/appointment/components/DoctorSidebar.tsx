import {
  Award,
  CircleCheck,
  Heart,
  MapPin,
  MessageCircle,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import DoctorStat from "./DoctorStat";
import { Button } from "@/components/ui/button";
import type { ResponseSpecificDoctor } from "../types/appointment.types";
import DoctorMap from "./DoctorMap";

export default function DoctorSidebar({
  doctor,
}: {
  doctor: ResponseSpecificDoctor;
}) {
  return (
    <aside
      className="
        rounded-2xl
        bg-app-neutral-lightest
        px-7
        py-9
        xl:px-9
      "
    >
      {/* ===============================================
          TOP ACTIONS
      =============================================== */}

      <div className="flex items-center justify-between">
        <CircleIconButton>
          <Heart size={25} strokeWidth={1.7} />
        </CircleIconButton>

        <CircleIconButton>
          <MessageCircle size={25} strokeWidth={1.7} />
        </CircleIconButton>
      </div>

      {/* ===============================================
          DOCTOR
      =============================================== */}

      <div className="-mt-5 text-center">
        <div className="relative mx-auto w-fit">
          <img
            src={doctor.profile_image || ""}
            alt={doctor.name || "not found"}
            className="
              h-32.5
              w-32.5
              rounded-full
              border-4  
              border-white
              object-cover
            "
          />

          {/* Verified */}
          <div
            className="
              absolute
              bottom-1
              right-0
              flex
              h-6.15
              w-6.15
              items-center
              justify-center
              rounded-full
              bg-app-primary
            "
          >
            <CircleCheck size={17} className="text-white" />
          </div>
        </div>

        <h2 className="mt-4 font-serif text-xl text-[##05162C]">
          {doctor.name}
        </h2>

        <p className="mt-1 text-base text-app-neutral">
          {doctor.specialist.name || "specialist"}
        </p>
      </div>

      {/* ===============================================
          STATS
      =============================================== */}

      <div className="mt-9 grid grid-cols-4 gap-2">
        <DoctorStat
          icon={<Users size={25} />}
          value={doctor.patients_count || 0}
          label="patients"
        />

        <DoctorStat
          icon={<Award size={25} />}
          value={doctor.experience || 0}
          label="experience"
        />

        <DoctorStat
          icon={<Star size={25} fill="currentColor" />}
          value={doctor.rating_avg.toString() || 0}
          label="rating"
        />

        <DoctorStat
          icon={<MessageSquare size={25} />}
          value={doctor.reviews_count.toLocaleString() || 0}
          label="reviews"
        />
      </div>

      {/* ===============================================
          ABOUT
      =============================================== */}

      <section className="mt-9">
        <h3 className="font-serif text-2xl text-app-secondary">About me</h3>

        <p className="mt-2 text-[16px] leading-[1.3] text-app-neutral">
          {doctor.about}
        </p>
      </section>

      {/* ===============================================
          LOCATION
      =============================================== */}

      <section className="mt-9">
        <h3 className="font-serif text-2xl text-app-secondary">Location</h3>

        <div
          className="
            relative
            mt-4
            h-57.5
            overflow-hidden
            rounded-2xl
            bg-[#DDE2E6]
          "
        >
          <DoctorMap latitude={doctor.location.latitude} longitude={doctor.location.longitude} />
        </div>
      </section>
    </aside>
  );
}
function CircleIconButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      className="
        flex
        h-13
        w-13
        rounded-full
        bg-white
        p-0
        text-[#071B35]
        shadow-none
        hover:bg-white
      "
    >
      {children}
    </Button>
  );
}
