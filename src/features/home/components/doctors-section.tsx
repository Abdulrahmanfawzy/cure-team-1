import { Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import { StarRating } from "@/components/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImageUrl } from "@/utils/image-url";

import { useTopRatedDoctors } from "../hooks/use-home";

export function DoctorsSection() {
  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useTopRatedDoctors();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <section className="pb-20 md:pb-24">
        <div className="main_container">
          <div className="mb-6">
            <div className="h-8 w-72 animate-pulse rounded bg-app-neutral-lightest" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-app-neutral-lightest" />
          </div>

          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="min-w-70 animate-pulse rounded-xl border border-app-neutral-lightest bg-white p-3 md:min-w-62.5"
              >
                <div className="flex gap-3">
                  <div className="size-12 rounded-lg bg-app-neutral-lightest" />

                  <div className="flex-1">
                    <div className="h-3 w-24 rounded bg-app-neutral-lightest" />

                    <div className="mt-2 h-3 w-32 rounded bg-app-neutral-lightest" />

                    <div className="mt-2 h-3 w-20 rounded bg-app-neutral-lightest" />
                  </div>
                </div>

                <div className="mt-4 h-3 w-20 rounded bg-app-neutral-lightest" />

                <div className="mt-3 h-8 rounded bg-app-neutral-lightest" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR / EMPTY ================= */

  if (isError || doctors.length === 0) {
    return null;
  }

  /*
   * Business requirement:
   * If there are more than 5 doctors, use the carousel.
   */
  const hasMoreThanFourDoctors = doctors.length > 4;

  return (
    <section className="pb-20 md:pb-24">
      <div className="main_container">
        {/* ================= HEADER ================= */}

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-app-secondary md:text-3xl">
              Top-Rated Doctors Chosen by Patients
            </h2>

            <p className="mt-2 max-w-130 text-xs leading-4 text-app-neutral-darker">
              Explore our highest-rated doctors, trusted by real patients for
              their expertise, care, and service.
            </p>
          </div>

          {/* Desktop View All */}

          <Link
            to="/doctors"
            className="
              hidden
              shrink-0
              rounded-md
              border
              border-app-primary
              px-5
              py-2
              text-[10px]
              text-app-primary
              transition-colors
              hover:bg-app-primary
              hover:text-white
              sm:block
            "
          >
            View All
          </Link>
        </div>

        {/* ================= DOCTORS ================= */}

      {hasMoreThanFourDoctors ? (
  <Carousel
    opts={{
      align: "start",
      dragFree: true,
    }}
    className="w-full"
  >
    <CarouselContent>
      {doctors.map((doctor) => (
        <CarouselItem
          key={doctor.id}
          className="
            basis-full
            sm:basis-1/2
            md:basis-1/3
            lg:basis-1/4
          "
        >
          <DoctorCard doctor={doctor} />
        </CarouselItem>
      ))}
    </CarouselContent>

    <CarouselPrevious
      className="
        -left-4
        hidden
        border-app-primary
        bg-white
        text-app-primary
        hover:bg-app-primary
        hover:text-white
        md:flex
      "
    />

    <CarouselNext
      className="
        -right-4
        hidden
        border-app-primary
        bg-white
        text-app-primary
        hover:bg-app-primary
        hover:text-white
        md:flex
      "
    />
  </Carousel>
) : (
  <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
    {doctors.map((doctor) => (
      <div
        key={doctor.id}
        className="min-w-70 flex-1 md:min-w-62.5"
      >
        <DoctorCard doctor={doctor} />
      </div>
    ))}
  </div>
)}

        {/* ================= MOBILE VIEW ALL ================= */}

        <div className="mt-5 flex justify-center sm:hidden">
          <Link
            to="/doctors"
            className="
              rounded-md
              border
              border-app-primary
              px-7
              py-2
              text-[10px]
              text-app-primary
              transition-colors
              hover:bg-app-primary
              hover:text-white
            "
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DOCTOR CARD
========================================================= */

function DoctorCard({
  doctor,
}: {
  doctor: {
    id: string;
    name: string;
    specialist?: {
      name: string;
    };
    hospital?: string;
    profile_image: string;
    rating_avg: string;
    consultation_price: string;
    availabilities?: {
      id: string;
      date: string;
      start_time: string;
      end_time: string;
      is_booked: boolean;
    }[];
  };
}) {
  const rating = Number(doctor.rating_avg) || 0;

  /* Find the first available appointment */

  const availableSlot = doctor.availabilities?.find(
    (slot) => !slot.is_booked,
  );

  const availability = availableSlot
    ? `${availableSlot.start_time} - ${availableSlot.end_time}`
    : "No availability";

  return (
    <article
      className="
        w-full
        rounded-xl
        border
        border-app-neutral-lightest
        bg-white
        p-2
        shadow-sm
      "
    >
      {/* ================= DOCTOR INFO ================= */}

      <div className="flex gap-3">
        <img
          src={getImageUrl(doctor.profile_image)}
          alt={doctor.name}
          className="size-12 shrink-0 rounded-lg object-cover"
          onError={(event) => {
            event.currentTarget.src = "/images/avatar.png";
          }}
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[11px] font-medium text-app-secondary">
            {doctor.name}
          </h3>

          <p className="truncate text-[11px] text-app-neutral-darker">
            {doctor.specialist?.name || "Specialist"}
            {doctor.hospital ? ` | ${doctor.hospital}` : ""}
          </p>

          {/* Rating + Availability */}

          <div className="mt-1 flex items-center gap-1 text-[8px]">
            <StarRating
              rating={rating}
              count={1}
            />

            <span className="ml-1">
              {rating.toFixed(1)}
            </span>

            <Clock3
              size={9}
              className="ml-1 shrink-0 text-app-neutral"
            />

            <span className="truncate">
              {availability}
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONSULTATION ================= */}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-app-neutral-darker">
          Consultation
        </span>

        <span className="text-[10px] font-medium text-app-error">
          {doctor.consultation_price}
        </span>
      </div>

      {/* ================= BOOK APPOINTMENT ================= */}

      <Link
        to={`/appointment?doctorId=${doctor.id}`}
        className="
          mt-2
          flex
          h-8
          items-center
          justify-center
          rounded-md
          bg-app-primary
          text-[10px]
          font-medium
          text-white
          transition-colors
          hover:bg-app-primary-lighter
        "
      >
        Book appointment
      </Link>
    </article>
  );
}