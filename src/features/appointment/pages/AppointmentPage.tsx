import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PATHS } from "@/app/router";
import ReviewCard from "../components/ReviewCard";
import DoctorSidebar from "../components/DoctorSidebar";
import RenderStars from "@/components/shared/common/RenderStars";

/* =========================================================
   TYPES
========================================================= */

type Day = {
  day: string;
  date: number;
};

type TimeSlot = {
  id: number;
  time: string;
};

type Review = {
  id: number;
  name: string;
  date: string;
  image: string;
  rating: number;
  comment: string;
};

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

/* =========================================================
   MOCK DATA
   Replace this later with API response
========================================================= */

const doctor: Doctor = {
  name: "Dr. Jessica Turner",
  specialty: "Pulmonologist",
  image: "https://i.pravatar.cc/300?img=47",
  patients: "2,000+",
  experience: "10+",
  rating: 4.5,
  reviews: 1872,
  about:
    "Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory and pulmonary conditions.",
  address: "129, El-Nasr Street, Cairo, Egypt",
};

const days: Day[] = [
  { day: "Fri", date: 12 },
  { day: "Sat", date: 13 },
  { day: "Sun", date: 14 },
  { day: "Mon", date: 15 },
  { day: "Tue", date: 16 },
  { day: "Wed", date: 17 },
  { day: "Thu", date: 18 },
];

const timeSlots: TimeSlot[] = [
  { id: 1, time: "9:00 AM" },
  { id: 2, time: "10:00 AM" },
  { id: 3, time: "11:00 AM" },
  { id: 4, time: "12:30 AM" },
  { id: 5, time: "5:30 PM" },
  { id: 6, time: "7:00 PM" },
  { id: 7, time: "9:00 PM" },
  { id: 8, time: "10:00 PM" },
];

const reviews: Review[] = [
  {
    id: 1,
    name: "Nabila Reyna",
    date: "30 min ago",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 4.5,
    comment:
      "Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!",
  },
  {
    id: 2,
    name: "Ferry Ichsan A",
    date: "A week ago",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 4.5,
    comment:
      "Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function AppointmentPage() {
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  const selectedDayData = days.find((day) => day.date === selectedDay);

  return (
    <div className="main_container py-10">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="mb-5 flex items-center gap-3">
        <Link
          to={PATHS.doctors}
          className="flex items-center gap-3 hover:bg-transparent"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
          <h1 className="text-2xl font-noto-serif-georgian">
            Make an appointment
          </h1>
        </Link>
      </div>

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="grid grid-cols-1  gap-8 xl:grid-cols-[minmax(0,1fr)_532px]">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="order-last xl:order-first">
          {/* ===============================================
              APPOINTMENT SELECTOR
          =============================================== */}

          <Card className="rounded-2xl  p-4.5 shadow-none">
            {/* Title */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-xl text-app-secondary">
                Choose date and time
              </span>

              <div className="flex items-center gap-3 ">
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

            <div className="mt-7 grid grid-cols-4 gap-4 sm:grid-cols-7">
              {days.map((day) => {
                const active = selectedDay === day.date;

                return (
                  <Button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedDay(day.date)}
                    size={"lg"}
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
                    <span>{day.day}</span>
                    <span className="mt-1">{day.date}</span>
                  </Button>
                );
              })}
            </div>

            {/* =============================================
                TIME SLOTS
            ============================================= */}

            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {timeSlots.map((slot) => {
                const active = selectedTime === slot.time;

                return (
                  <Button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    size={"lg"}
                    className={`
                     h-11.25
                     py-2
                     rounded-lg 
                     text-base
                      transition
                      ${
                        active
                          ? "bg-app-primary text-white"
                          : "bg-app-neutral-lightest text-app-neutral-darker hover:bg-app-neutral-lighter"
                      }
                    `}
                  >
                    {slot.time}
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
                  Monday, November {selectedDayData?.date} -{selectedTime}
                </span>
              </div>

              <Button
                size={"lg"}
                variant={"outline"}
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
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-app-secondary">
                Reviews and Rating
              </h2>

              <Button
                variant="ghost"
                className="gap-2 p-0 text-lg font-normal text-app-primary hover:bg-transparent hover:text-app-primary"
              >
                <Pencil size={23} />
                add review
              </Button>
            </div>

            {/* =============================================
                RATING SUMMARY
            ============================================= */}

            <div className="mt-10 flex items-baseline justify-between">
              <span className="font-serif text-5xl text-app-secondary">
                4.5/5
              </span>

              <div className="text-right">
                <div className="flex gap-1">
                  <RenderStars rating={2} />
                </div>

                <p className="mt-1 text-base text-app-neutral-darker">
                  1250+ Reviews
                </p>
              </div>
            </div>

            {/* =============================================
                REVIEWS
            ============================================= */}

            <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE / DOCTOR
        ================================================= */}

        <DoctorSidebar  doctor={doctor} />
      </div>
    </div>
  );
}
