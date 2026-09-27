import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import AppointmentCard from "../components/AppointmentCard";

type AppointmentStatus = "Upcoming" | "Completed" | "Canceled";

type Appointment = {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  address: string;
  image: string;
  status: AppointmentStatus;
};

// mock data
const appointments: Appointment[] = [
  {
    id: 1,
    date: "Monday, July 21",
    time: "11:00 AM",
    doctor: "Jennifer Miller",
    specialty: "Psychiatrist",
    address: "129, El-Nasr Street, Cairo, Egypt",
    image: "https://i.pravatar.cc/150?img=47",
    status: "Upcoming",
  },
  {
    id: 2,
    date: "Monday, July 21",
    time: "11:00 AM",
    doctor: "Jennifer Miller",
    specialty: "Psychiatrist",
    address: "129, El-Nasr Street, Cairo, Egypt",
    image: "https://i.pravatar.cc/150?img=47",
    status: "Completed",
  },
  {
    id: 3,
    date: "Monday, July 21",
    time: "11:00 AM",
    doctor: "Jennifer Miller",
    specialty: "Psychiatrist",
    address: "129, El-Nasr Street, Cairo, Egypt",
    image: "https://i.pravatar.cc/150?img=47",
    status: "Canceled",
  },
  {
    id: 4,
    date: "Monday, July 21",
    time: "11:00 AM",
    doctor: "Jennifer Miller",
    specialty: "Psychiatrist",
    address: "129, El-Nasr Street, Cairo, Egypt",
    image: "https://i.pravatar.cc/150?img=12",
    status: "Completed",
  },
];

const filters = ["All", "Upcoming", "Completed", "Canceled"] as const;

type Filter = (typeof filters)[number];

export default function BookPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "All") {
      return appointments;
    }

    return appointments.filter(
      (appointment) => appointment.status === activeFilter,
    );
  }, [activeFilter]);

  return (
    <div className="main_container w-full px-4 py-8 md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}
      <header className="mb-6">
        {/* Title  */}
        <h1 className="font-serif text-3xl mb-6 font-medium leading-tight text-app-secondary ">
          Your appointments
        </h1>

        {/* data and filter */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-baseline  lg:justify-between">
          {/* Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <Button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  variant="ghost"
                  size={"lg"}
                  className={`
                      text-base
                      ${
                        isActive
                          ? "bg-app-primary text-white hover:bg-app-primary hover:text-white"
                          : "text-app-secondary hover:bg-transparent hover:text-app-primary"
                      }
                    `}
                >
                  {filter}
                </Button>
              );
            })}
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size={"lg"}>
                <span className="flex items-center gap-3">
                  <CalendarDays
                    size={21}
                    strokeWidth={1.7}
                    className="text-[#8D97A5]"
                  />

                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "Monday, July 21"}
                </span>

                <ChevronDown
                  size={21}
                  strokeWidth={1.7}
                  className="text-app-primary"
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* ================= APPOINTMENTS ================= */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
