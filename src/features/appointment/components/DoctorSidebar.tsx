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
type Doctor = {
  name: string;
  specialty: string;
  image: string;
  patients: string;
  experience: string;
  rating: number;
  reviews: number;
  about: string;
  address: string;
};

export default function DoctorSidebar({ doctor }: { doctor: Doctor }) {
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
            src={doctor.image}
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
              bg-[#1762BD]
            "
          >
            <CircleCheck size={17} className="text-white" />
          </div>
        </div>

        <h2 className="mt-4 font-serif text-[24px] text-[#071B35]">
          {doctor.name}
        </h2>

        <p className="mt-1 text-[16px] text-[#626975]">{doctor.specialty}</p>
      </div>

      {/* ===============================================
          STATS
      =============================================== */}

      <div className="mt-9 grid grid-cols-4 gap-2">
        <DoctorStat
          icon={<Users size={25} />}
          value={doctor.patients}
          label="patients"
        />

        <DoctorStat
          icon={<Award size={25} />}
          value={doctor.experience}
          label="experience"
        />

        <DoctorStat
          icon={<Star size={25} fill="currentColor" />}
          value={doctor.rating.toString()}
          label="rating"
        />

        <DoctorStat
          icon={<MessageSquare size={25} />}
          value={doctor.reviews.toLocaleString()}
          label="reviews"
        />
      </div>

      {/* ===============================================
          ABOUT
      =============================================== */}

      <section className="mt-9">
        <h3 className="font-serif text-2xl text-app-secondary">About me</h3>

        <p className="mt-2 text-[16px] leading-[1.3] text-[#4C5058]">
          {doctor.about.slice(0, 150)}{" "}
          <button className="text-app-primary">Read more</button>
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
          {/* Temporary map */}
          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(115deg,#dfe6d4_0%,#f2e5c7_40%,#e6e6e6_70%,#d5dce2_100%)]
            "
          />

          {/* Fake map roads */}
          <div className="absolute left-[15%] top-[-20%] h-[140%] w-3.25 rotate-[28deg] bg-white/80" />
          <div className="absolute left-[48%] top-[-20%] h-[140%] w-4.5 rotate-[22deg] bg-[#F8E2A4]" />
          <div className="absolute left-[75%] top-[-20%] h-[140%] w-2.25 rotate-[48deg] bg-white/80" />

          <div className="absolute left-[20%] top-[35%] h-1.25 w-[90%] rotate-[8deg] bg-white/80" />
          <div className="absolute left-[-10%] top-[60%] h-1.75 w-[120%] rotate-[-4deg] bg-white/80" />

          {/* Location Pin */}
          <div className="absolute left-[42%] top-[40%]">
            <MapPin size={36} fill="#1762BD" className="text-[#1762BD]" />
          </div>

          {/* Address */}
          <div
            className="
              absolute
              bottom-4
              left-1/2
              flex
              w-[88%]
              -translate-x-1/2
              items-center
              gap-2
              rounded-xl
              bg-white
              px-4
              py-2
              shadow-sm
            "
          >
            <MapPin size={19} className="shrink-0 text-[#1762BD]" />

            <span className="truncate text-[15px] text-[#303845]">
              {doctor.address}
            </span>
          </div>
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
