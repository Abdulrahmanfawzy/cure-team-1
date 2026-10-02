import {
  ArrowRight,
  CalendarDays,
  MapPin,
  MousePointer2,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import { getImageUrl } from "@/utils/image-url";

import { useReviews } from "../hooks/use-home";

export function HeroSection() {
  const { data: reviews = [] } = useReviews();

  const patientImages = reviews
    .filter((review) => review.patient?.profile_image)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-24 pb-10 md:min-h-130 md:pt-28">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute left-1/2 top-25 -z-10 size-85 -translate-x-1/2 rounded-full border border-app-primary-lightest md:size-130" />

      <div className="pointer-events-none absolute left-1/2 top-18 -z-10 size-110 -translate-x-1/2 rounded-full border border-app-primary-lightest md:size-170" />

      <div className="main_container">
        <div className="mx-auto flex max-w-150 flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-app-primary-lightest px-3 py-1 text-[9px] font-medium text-app-primary">
            <Sparkles size={18} />
            <span>Upgrade your account</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-130 font-serif text-3xl leading-tight text-app-secondary md:text-4xl">
            Find and book top doctors near you
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-120 text-xs leading-4 text-app-neutral-darker md:text-sm">
            Easily find top-rated specialists near you and book
            appointments in just a few clicks. Whether you need an
            in-person visit or consultation, we're here to connect
            you with the right care—fast, simple, and secure.
          </p>

          {/* Patients */}
          <div className="mt-5 flex items-center gap-3 rounded-full bg-app-primary-lightest px-3 py-1.5">
            <div className="flex -space-x-2">
              {patientImages.map((review) => (
                <div
                  key={review.id}
                  className="size-6 overflow-hidden rounded-full border-2 border-white bg-app-neutral"
                >
                  <img
                    src={getImageUrl(review.patient.profile_image)}
                    alt={review.patient.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <span className="text-[9px] font-medium text-app-secondary">
              10k+ happy patients
            </span>
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/doctors"
              className="inline-flex h-10 min-w-28 items-center justify-center rounded-md bg-app-primary px-5 text-xs font-medium text-white transition-colors hover:bg-app-primary-lighter"
            >
              Get started
            </Link>

            <div className="relative">
              <Link
                to="/appointment"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-app-primary px-5 text-xs font-medium text-app-primary transition-colors hover:bg-app-primary-lightest"
              >
                <CalendarDays size={14} />
                Book Appointment
              </Link>

              {/* Book Now + Mouse Pointer */}
              <div className="absolute -right-35 hidden -translate-y-1/2 rotate-12 items-center sm:flex">
                <MousePointer2
                  size={25}
                  className="mr-2 -rotate-35 text-app-primary fill-app-primary "
                />

                <div className="-ml-1 rounded bg-neutral-200 px-4 py-1 text-[10px] font-medium text-app-secondary shadow-md">
                  Book Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor near you */}
      <div className="pointer-events-none absolute left-[23%] top-60 hidden flex-col items-center gap-2 md:flex">
        <MapPin size={25} className="text-app-primary " />

        <div className="rounded bg-neutral-200 px-4 py-1 text-[9px] font-medium text-app-secondary shadow-md">
          Doctor near you
        </div>
      </div>
    </section>
  );
}