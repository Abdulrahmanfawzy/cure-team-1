import { MapPin, Search } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DoctorMap } from "../../doctors/components/DoctorMap";

import { useNearbyDoctors } from "../hooks/use-home";

import type {
  ConsultationType,
  Doctor as DoctorMapType,
  Gender,
} from "../../doctors/types/doctor.types";

export function LocationSection() {
  const [isMapOpen, setIsMapOpen] = useState(false);

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

  /* ================= HOME API → DOCTOR MAP ================= */

  const doctorsForMap: DoctorMapType[] = validDoctors.map((doctor) => {
    const availableToday =
      doctor.availabilities?.some(
        (availability) => availability.date === "today",
      ) ?? false;

    const availableTomorrow =
      doctor.availabilities?.some(
        (availability) => availability.date === "tomorrow",
      ) ?? false;

    const firstAvailability = doctor.availabilities?.[0];

    const availableTime = firstAvailability
      ? `${firstAvailability.start_time} - ${firstAvailability.end_time}`
      : "Not available";

    return {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialist.name,
      hospital: doctor.hospital,
      rating: Number(doctor.rating_avg) || 0,
      availableTime,
      price: Number(doctor.consultation_price) || 0,
      gender: doctor.gender as Gender,
      consultationTypes: [
        doctor.consultation_type as ConsultationType,
      ],
      availableToday,
      availableTomorrow,
      image: doctor.profile_image,
      latitude: doctor.latitude,
      longitude: doctor.longitude,
    };
  });

  const mapCenter = validDoctors[0];

  const mapUrl = mapCenter
    ? `https://www.google.com/maps?q=${mapCenter.latitude},${mapCenter.longitude}&output=embed`
    : "";

  return (
    <>
      {/* =====================================================
          LOCATION SECTION
      ===================================================== */}

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
                onClick={() => setIsMapOpen(true)}
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

            {/* ================= MAIN MAP PREVIEW ================= */}

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

              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-1 text-xs text-red-500">
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

      {/* =====================================================
          LOCATION DIALOG
      ===================================================== */}

      <Dialog
        open={isMapOpen}
        onOpenChange={setIsMapOpen}>
        <DialogContent
          className="
    flex
    h-[82vh]
    max-h-[85vh]
    w-[calc(95%-1rem)]
    max-w-5xl
    flex-col
    gap-0
    overflow-hidden
    rounded-2xl
    bg-white
    p-0

    sm:h-[85vh]
    sm:w-[calc(95%-2rem)]
  "
        >
          <DialogHeader
            className="
      shrink-0
      border-b
      border-app-neutral-lightest
      px-4
      py-3
      text-left

      sm:px-6
      sm:py-4
    "
          >
            <DialogTitle className="text-base text-app-secondary sm:text-lg">
              Find Care Near You
            </DialogTitle>

            <DialogDescription className="text-[11px] leading-4 text-app-neutral-darker sm:text-xs">
              Discover nearby doctors and clinics based on their location.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2 sm:px-4 sm:pb-4">
            <div className="h-full w-full overflow-hidden rounded-lg sm:rounded-xl [&_.mt-8]:!mt-0">
              {doctorsForMap.length > 0 ? (
                <DoctorMap doctors={doctorsForMap} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg bg-app-neutral-lightest">
                  <p className="px-4 text-center text-xs text-app-neutral-darker sm:text-sm">
                    No doctors found near you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}