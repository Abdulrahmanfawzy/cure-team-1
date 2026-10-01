import { MapPin, Search } from "lucide-react";

import { getImageUrl } from "@/utils/image-url";

import { useNearbyDoctors } from "../hooks/use-home";

export function LocationSection() {
  const {
    data: nearbyDoctors = [],
    isLoading,
    isError,
  } = useNearbyDoctors();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <section className="pb-18 md:pb-24">
        <div className="main_container">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="max-w-100">
              <div className="h-8 w-64 animate-pulse rounded bg-app-neutral-lightest" />

              <div className="mt-4 h-16 w-full animate-pulse rounded bg-app-neutral-lightest" />

              <div className="mt-5 h-9 w-36 animate-pulse rounded-md bg-app-neutral-lightest" />
            </div>

            <div className="aspect-[1.4] w-full animate-pulse rounded-2xl bg-app-neutral-lightest" />
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR / EMPTY ================= */

  if (isError || nearbyDoctors.length === 0) {
    return null;
  }

  /* ================= VALID DOCTORS ================= */

  const validDoctors = nearbyDoctors.filter(
    (doctor) =>
      typeof doctor.latitude === "number" &&
      typeof doctor.longitude === "number",
  );

  /*
   * Use the first nearby doctor as the map center.
   * Doctor locations come from the backend.
   */

  const mapCenter = validDoctors[0];

  const mapUrl = mapCenter
    ? `https://www.google.com/maps?q=${mapCenter.latitude},${mapCenter.longitude}&output=embed`
    : "";

  return (
    <section className="pb-18 md:pb-24">
      <div className="main_container">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* ================= CONTENT ================= */}

          <div className="max-w-100">
            <h2 className="font-serif text-2xl leading-tight text-app-secondary md:text-3xl">
              Find Care Near You
              <br />
              in Seconds
            </h2>

            <p className="mt-4 text-xs leading-5 text-app-neutral-darker md:text-sm">
              Allow location access or choose your city to instantly discover
              trusted doctors and clinics around you—quick, easy, and local.
            </p>

            <button
              type="button"
              className="
                mt-5
                inline-flex
                h-9
                items-center
                gap-2
                rounded-md
                border
                border-app-primary
                px-4
                text-[10px]
                text-app-primary
                transition-colors
                hover:bg-app-primary-lightest
              "
            >
              <Search size={13} />
              Search by location
            </button>
          </div>

          {/* ================= MAP ================= */}

          <div className="relative overflow-hidden rounded-2xl">
            {mapUrl && (
              <iframe
                title="Cure nearby doctors map"
                src={mapUrl}
                className="aspect-[1.4] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}

            {/* Doctor pins */}

            {validDoctors.slice(0, 5).map((doctor) => (
              <DoctorMapPin
                key={doctor.id}
                doctor={doctor}
              />
            ))}

            {/* Map indicator */}

            <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs text-red-500">
              <MapPin
                size={18}
                fill="currentColor"
              />

              <span className="sr-only">
                Nearby doctors
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DOCTOR MAP PIN
========================================================= */

function DoctorMapPin({
  doctor,
}: {
  doctor: {
    id: string;
    name: string;
    profile_image: string;
    distance: number | null;
  };
}) {
  return (
    <div
      className="
        absolute
        left-1/2
        top-1/2
        flex
        -translate-x-1/2
        -translate-y-1/2
        items-center
        gap-2
        rounded-full
        border-2
        border-white
        bg-app-secondary
        p-1
        shadow-lg
      "
    >
      <img
        src={getImageUrl(doctor.profile_image)}
        alt={doctor.name}
        className="size-7 rounded-full object-cover"
      />

      {doctor.distance !== null && (
        <span className="pr-2 text-[8px] text-white">
          {doctor.distance} km
        </span>
      )}
    </div>
  );
}