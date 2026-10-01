import {
  Award,
  CircleCheck,
  Heart,
  MessageCircle,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import DoctorStat from "./DoctorStat";
import type { DoctorData } from "../types/appointment.type";
import DoctorMap from "./DoctorMap";
import CircleIconButton from "./CircleIconButton";

export default function DoctorSidebar({ doctor }: { doctor: DoctorData }) {
  return (
    <aside
      className="
        rounded-2xl
        bg-[#F5F6F7]
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
            src={"https://round-13-cure.huma-volve.com/"+doctor.profile_image}
            alt={doctor.name}
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

        <h2 className="mt-4 font-serif text-[24px] text-app-secondary">
          {doctor.name}
        </h2>

        <p className="mt-1 text-base text-app-neutral">
          {doctor.specialist.name}
        </p>
      </div>

      {/* ===============================================
          STATS
      =============================================== */}

      <div className="mt-9 grid grid-cols-4 gap-2">
        <DoctorStat
          icon={<Users size={25} />}
          value={doctor.patients_count.toLocaleString()}
          label="patients"
        />

        <DoctorStat
          icon={<Award size={25} />}
          value={doctor.experience.toLocaleString()}
          label="experience"
        />

        <DoctorStat
          icon={<Star size={25} fill="currentColor" />}
          value={doctor.rating_avg.toFixed(1).toString()}
          label="rating"
        />

        <DoctorStat
          icon={<MessageSquare size={25} />}
          value={doctor.reviews.length.toString()}
          label="reviews"
        />
      </div>

      {/* ===============================================
          ABOUT
      =============================================== */}

      <section className="mt-9">
        <h3 className="font-serif text-2xl text-app-secondary">About me</h3>

        <p className="mt-2 text-base leading-[1.3] text-app-secondary">
          {doctor.about.slice(0, 150)}{" "}
        </p>
      </section>

      {/* ===============================================
          LOCATION
      =============================================== */}

      <section className="mt-14">
        <h3 className="font-serif text-2xl text-app-secondary">Location</h3>

        <div className="mt-5">
          <DoctorMap
            latitude={doctor.location.latitude}
            longitude={doctor.location.longitude}
          />
        </div>
      </section>
    </aside>
  );
}
