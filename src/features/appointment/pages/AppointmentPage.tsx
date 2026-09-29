import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ReviewCard from "../components/ReviewCard";
import DoctorSidebar from "../components/DoctorSidebar";
import RenderStars from "@/components/shared/common/RenderStars";
import useSpecificDoctor from "../hooks/useSpecificDoctor";
import AppointmentHeader from "../components/AppointmentHeader";
import PageLoader from "@/components/shared/PageLoader";
import { useParams } from "react-router-dom";
import ReviewModal from "../components/ReviewModal";

/* =========================================================
   TYPES
========================================================= */
interface SelectedDay {
  id: string;
  date: string;
}

/* =========================================================
   PAGE
========================================================= */

export default function AppointmentPage() {
  const { id } = useParams();
  // test
  const { data: doctor, isLoading } = useSpecificDoctor(
    "01a0e8ff-60eb-708c-bec3-b7fe3a1eb596",
    // id
  );
 
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  /* =========================================================
     AVAILABLE DAYS
  ========================================================= */

  const availableDays = useMemo(() => {
    if (!doctor?.available_slots) return [];

    const uniqueDays = new Map<string, SelectedDay>();

    doctor.available_slots.forEach((slot) => {
      if (!uniqueDays.has(slot.date)) {
        uniqueDays.set(slot.date, {
          id: slot.id,
          date: slot.date,
        });
      }
    });

    return Array.from(uniqueDays.values());
  }, [doctor?.available_slots]);

  /* =========================================================
     SELECTED DAY SLOTS
  ========================================================= */

  const selectedDaySlots = useMemo(() => {
    if (!doctor?.available_slots || !selectedDay) return [];

    return doctor.available_slots.filter(
      (slot) => slot.date === selectedDay.date,
    );
  }, [doctor?.available_slots, selectedDay]);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleSelectDay = (day: SelectedDay) => {
    setSelectedDay(day);

    // Reset selected time when changing the day
    setSelectedTime("");
  };

  const handleSelectTime = (slotId: string) => {
    setSelectedTime(slotId);
  };

  /* =========================================================
     SELECTED SLOT
  ========================================================= */

  const selectedSlot = doctor?.available_slots.find(
    (slot) => slot.id === selectedTime,
  );

  // loading
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="main_container py-10">
      {/* =================================================
          PAGE HEADER
      ================================================= */}
      <AppointmentHeader />

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_532px]">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="order-last xl:order-first">
          {/* ===============================================
              APPOINTMENT SELECTOR
          =============================================== */}

          <Card className="rounded-2xl p-4.5 shadow-none">
            {/* Title */}

            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-xl text-app-secondary">
                Choose date and time
              </span>

              <div className="flex items-center gap-3">
                <CalendarDays size={23} strokeWidth={1.7} />

                <span className="text-lg">November, 2024</span>

                <div className="flex flex-col">
                  <ChevronUp size={17} />
                  <ChevronDown size={17} />
                </div>
              </div>
            </div>

            {/* =============================================
                DAYS
            ============================================= */}

            <div className="mt-7 grid grid-cols-4 gap-4 sm:grid-cols-6">
              {availableDays.map((day) => {
                const active = selectedDay?.date === day.date;

                const [, month, date] = day.date.split("-");

                return (
                  <Button
                    key={day.date}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    size="lg"
                    className={`
                      flex
                      h-17
                      flex-col
                      items-center
                      justify-center
                      py-5
                      text-base
                      ${
                        active
                          ? "bg-app-primary text-white"
                          : "bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-neutral-lighter"
                      }
                    `}
                  >
                    <span>M-{month}</span>

                    <span className="mt-1">D-{date}</span>
                  </Button>
                );
              })}
            </div>

            {/* =============================================
                TIME SLOTS
            ============================================= */}

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {selectedDaySlots.map((slot) => {
                const active = selectedTime === slot.id;

                return (
                  <Button
                    key={slot.id}
                    type="button"
                    onClick={() => handleSelectTime(slot.id)}
                    size="lg"
                    className={`
                      h-11.25
                      rounded-lg
                      py-2
                      text-base
                      transition
                      ${
                        active
                          ? "bg-app-primary text-white"
                          : "bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-neutral-lighter"
                      }
                    `}
                  >
                    {slot.start_time}
                  </Button>
                );
              })}
            </div>

            {/* =============================================
                SELECTED APPOINTMENT + BOOK
            ============================================= */}

            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-base text-app-secondary">
                <CalendarDays
                  size={21}
                  strokeWidth={1.8}
                  className="text-app-primary"
                />

                <span>
                  {selectedDay?.date ?? ""} - {selectedSlot?.start_time ?? ""}
                </span>
              </div>

              <Button
                size="lg"
                variant="outline"
                disabled={!selectedDay || !selectedSlot}
                className="
                  h-11.25
                  px-12
                  text-base
                  hover:text-white
                "
              >
                Book
              </Button>
            </div>
          </Card>

          {/* ===============================================
              REVIEWS HEADER
          =============================================== */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-xl text-app-secondary">
                Reviews and Rating
              </h2>

              <ReviewModal id={doctor?.id || "0"} />
            </div>

            {/* =============================================
                RATING SUMMARY
            ============================================= */}

            <div className="mt-10 flex items-baseline justify-between">
              <span className="font-serif text-5xl text-app-secondary">
                {doctor?.rating_avg ?? 0}/5
              </span>

              <div className="text-right">
                <div className="flex gap-1">
                  <RenderStars rating={doctor?.rating_avg ?? 0} />
                </div>

                <p className="mt-1 text-base text-app-neutral-darker">
                  {doctor?.reviews_count ?? 0}+ Reviews
                </p>
              </div>
            </div>

            {/* =============================================
                REVIEWS
            ============================================= */}

            <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {doctor?.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE / DOCTOR
        ================================================= */}
        {doctor && <DoctorSidebar doctor={doctor} />}

        {/* =================================================
            RIGHT SIDE / DOCTOR
        ================================================= */}
      </div>
    </div>
  );
}
