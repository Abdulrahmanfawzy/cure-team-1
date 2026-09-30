import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

import ReviewCard from "../components/ReviewCard";
import DoctorSidebar from "../components/DoctorSidebar";
import RenderStars from "@/components/shared/common/RenderStars";
import { useDoctorSpecificAppointment } from "../hooks/useDoctorSpecificAppointment";
import type { DoctorData } from "../types/appointment.type";
import LoaderPage from "../components/LoaderPage";
import { formatDateAppointment } from "../lib/format";
import HeaderAppointment from "../components/HeaderAppointment";
import useCreateBook from "../hooks/useCreateBook";
import ReviewModal from "../components/ReviewModal";

export default function AppointmentPage() {
  const { id } = useParams<{ id: string }>();

  // =====================================================
  // GET DOCTOR DATA
  // =====================================================

  const { data, isLoading, isError } = useDoctorSpecificAppointment(
    "01a0e8ff-5df1-7013-a02a-cd808dadc042",
  );

  // =====================================================
  // CREATE BOOKING
  // =====================================================

  const { mutate: createBook, isPending } = useCreateBook();

  // =====================================================
  // STATE
  // =====================================================

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // =====================================================
  // DOCTOR
  // =====================================================

  const doctor: DoctorData | undefined = data?.data;

  // =====================================================
  // AVAILABLE DAYS
  // =====================================================

  const availableDays = useMemo(() => {
    if (!doctor?.available_slots) return [];

    return [...new Set(doctor.available_slots.map((slot) => slot.date))];
  }, [doctor]);

  // =====================================================
  // ALL AVAILABLE SLOTS
  // =====================================================

  const availableSlots = useMemo(() => {
    if (!doctor?.available_slots) return [];

    return doctor.available_slots.flatMap((day) =>
      day.slots.map((slot) => ({
        ...slot,
        date: day.date,
      })),
    );
  }, [doctor]);

  // =====================================================
  // FIRST AVAILABLE SLOT
  // =====================================================

  useEffect(() => {
    if (!availableSlots.length) return;

    const firstAvailableSlot = availableSlots.find((slot) => !slot.is_booked);

    if (!firstAvailableSlot) return;

    setSelectedDay(firstAvailableSlot.date);

    setSelectedSlotId(firstAvailableSlot.id);
  }, [availableSlots]);

  // =====================================================
  // FILTER SLOTS BY SELECTED DAY
  // =====================================================

  const filteredSlots = useMemo(() => {
    if (!selectedDay) return [];

    return availableSlots.filter((slot) => slot.date === selectedDay);
  }, [availableSlots, selectedDay]);

  // =====================================================
  // SELECTED SLOT
  // =====================================================

  const selectedSlot = useMemo(() => {
    return availableSlots.find((slot) => slot.id === selectedSlotId);
  }, [availableSlots, selectedSlotId]);

  // =====================================================
  // CURRENT MONTH
  // =====================================================

  const currentMonth = selectedDay
    ? formatDateAppointment(selectedDay).month
    : availableDays.length
      ? formatDateAppointment(availableDays[0]).month
      : "";

  // =====================================================
  // HANDLE DAY SELECTION
  // =====================================================

  const handleSelectDay = (date: string) => {
    setSelectedDay(date);

    // Reset current slot
    setSelectedSlotId(null);

    // Find first available slot
    // for the selected day
    const firstAvailableSlot = availableSlots.find(
      (slot) => slot.date === date && !slot.is_booked,
    );

    if (firstAvailableSlot) {
      setSelectedSlotId(firstAvailableSlot.id);
    }
  };

  // =====================================================
  // HANDLE SLOT SELECTION
  // =====================================================

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  // =====================================================
  // HANDLE BOOK
  // =====================================================

  const handleBookAppointment = () => {
    if (!selectedSlotId) return;

    createBook({
      // TODO:
      // replace with actual doctor id
      doctor_id: "01a0e8ff-5df1-7013-a02a-cd808dadc042",

      slot_id: selectedSlotId,

      consultation_type: "in_person",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return <LoaderPage />;
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (isError || !doctor) {
    return (
      <div className="main_container py-10">
        <div className="flex min-h-100 items-center justify-center">
          <p className="text-red-500">Failed to load doctor information.</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="main_container py-10">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <HeaderAppointment />

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_532px]">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="order-last xl:order-first">
          {/* =================================================
              APPOINTMENT SELECTOR
          ================================================= */}

          <Card className="rounded-2xl p-4.5 shadow-none">
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              {/* TITLE */}

              <span className="text-xl text-app-secondary">
                Choose date and time
              </span>

              {/* =================================================
                  MONTH CALENDAR BUTTON
              ================================================= */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="
                      flex
                      items-center
                      gap-2
                      px-2
                      text-lg
                      text-app-secondary
                      hover:bg-transparent
                    "
                  >
                    <CalendarDays size={23} strokeWidth={1.7} />

                    <span>{currentMonth}</span>

                    <ChevronDown size={18} strokeWidth={1.7} />
                  </Button>
                </PopoverTrigger>

                {/* =================================================
                    CALENDAR POPUP
                ================================================= */}

                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={
                      selectedDay
                        ? new Date(`${selectedDay}T00:00:00`)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (!date) return;

                      // IMPORTANT:
                      // Use local date instead of
                      // toISOString to avoid timezone issues.

                      const year = date.getFullYear();

                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0",
                      );

                      const day = String(date.getDate()).padStart(2, "0");

                      const dateString = `${year}-${month}-${day}`;

                      handleSelectDay(dateString);
                    }}
                    disabled={(date) => {
                      const year = date.getFullYear();

                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0",
                      );

                      const day = String(date.getDate()).padStart(2, "0");

                      const dateString = `${year}-${month}-${day}`;

                      return !availableDays.includes(dateString);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* =================================================
                AVAILABLE DAYS
            ================================================= */}

            <div className="mt-7 grid grid-cols-4 gap-4 sm:grid-cols-7">
              {availableDays.map((date) => {
                const formattedDate = formatDateAppointment(date);

                const active = selectedDay === date;

                return (
                  <Button
                    key={date}
                    type="button"
                    onClick={() => handleSelectDay(date)}
                    size="lg"
                    className={`
                        flex
                        h-17.25
                        flex-col
                        items-center
                        justify-center
                        py-3
                        text-base

                        ${
                          active
                            ? "bg-app-primary text-white"
                            : "bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-neutral-lighter"
                        }
                      `}
                  >
                    <span>{formattedDate.dayName.slice(0, 3)}</span>

                    <span className="mt-1">{formattedDate.dayNumber}</span>
                  </Button>
                );
              })}
            </div>

            {/* =================================================
                TIME SLOTS
            ================================================= */}

            <div className="mt-7">
              {/* =================================================
                  SLOTS HEADER
              ================================================= */}

              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg text-app-secondary">
                  Available time slots
                </span>

                <span className="text-sm text-app-neutral-darker">
                  {filteredSlots.length} slots
                </span>
              </div>

              {/* =================================================
                  NO SLOTS
              ================================================= */}

              {filteredSlots.length === 0 ? (
                <div className="rounded-xl bg-app-neutral-lightest p-6 text-center">
                  <p className="text-app-neutral-darker">
                    No available slots for this day.
                  </p>
                </div>
              ) : (
                /* =================================================
                    SLOTS
                ================================================= */

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {filteredSlots.map((slot) => {
                    const active = selectedSlotId === slot.id;

                    return (
                      <Button
                        key={slot.id}
                        type="button"
                        disabled={slot.is_booked}
                        onClick={() => handleSelectSlot(slot.id)}
                        size="lg"
                        className={`
                            h-auto
                            min-h-16
                            rounded-lg
                            py-2
                            text-base
                            transition

                            ${
                              active
                                ? "bg-app-primary text-white"
                                : slot.is_booked
                                  ? "cursor-not-allowed bg-gray-100 text-gray-400 opacity-70"
                                  : "bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-neutral-lighter"
                            }
                          `}
                      >
                        <div className="flex flex-col items-center">
                          <span>{slot.start_time}</span>

                          {slot.is_booked && (
                            <span className="text-xs opacity-70">Booked</span>
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =================================================
                SELECTED APPOINTMENT + BOOK
            ================================================= */}

            {selectedSlot && (
              <div className="mt-7 flex flex-col gap-5 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {/* =================================================
                    SELECTED DATE / TIME
                ================================================= */}

                <div className="flex items-center gap-3 text-base text-app-secondary">
                  <CalendarDays
                    size={21}
                    strokeWidth={1.8}
                    className="text-app-primary"
                  />

                  <span>
                    {formatDateAppointment(selectedSlot.date).fullDate}

                    {" - "}

                    {selectedSlot.start_time}
                  </span>
                </div>

                {/* =================================================
                    BOOK BUTTON
                ================================================= */}

                <Button
                  size="lg"
                  variant="outline"
                  className="
                    h-11.25
                    px-12
                    text-base
                    hover:text-white
                  "
                  onClick={handleBookAppointment}
                  disabled={isPending}
                  isLoading={isPending}
                >
                  Book
                </Button>
              </div>
            )}
          </Card>

          {/* =================================================
              REVIEWS
          ================================================= */}

          <div className="mt-8">
            {/* =================================================
                REVIEWS HEADER
            ================================================= */}

            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-app-secondary">
                Reviews and Rating
              </h2>

              <ReviewModal id={doctor.id} />
            </div>

            {/* =================================================
                RATING SUMMARY
            ================================================= */}

            <div className="mt-10 flex items-baseline justify-between">
              <span className="font-serif text-5xl text-app-secondary">
                {doctor.rating_avg}/5
              </span>

              <div className="text-right">
                <div className="flex gap-1">
                  <RenderStars rating={doctor.rating_avg} />
                </div>

                <p className="mt-1 text-base text-app-neutral-darker">
                  {doctor.reviews_count} Reviews
                </p>
              </div>
            </div>

            {/* =================================================
                REVIEWS
            ================================================= */}

            <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {doctor.reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* =================================================
                NO REVIEWS
            ================================================= */}

            {!doctor.reviews?.length && (
              <div className="mt-8 rounded-xl bg-app-neutral-lightest p-6 text-center">
                <p className="text-app-neutral-darker">No reviews yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE / DOCTOR
        ================================================= */}

        <DoctorSidebar doctor={doctor} />
      </div>
    </div>
  );
}
