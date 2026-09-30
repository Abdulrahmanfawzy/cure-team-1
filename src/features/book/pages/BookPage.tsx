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
import useGetAllBook from "../hook/useGetAllBook";
import LoaderPage from "@/features/appointment/components/LoaderPage";

const filters = ["All", "Upcoming", "Completed", "Canceled"] as const;

type Filter = (typeof filters)[number];

export default function BookPage() {
  const { data, isLoading } = useGetAllBook();

  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const filteredAppointments = useMemo(() => {
    const appointments = data?.data ?? [];

    return appointments.filter((appointment) => {
      /* ================= STATUS FILTER ================= */

      const matchesStatus =
        activeFilter === "All" ||
        appointment.status.toLowerCase() === activeFilter.toLowerCase();

      /* ================= DATE FILTER ================= */

      const matchesDate =
        !selectedDate ||
        appointment.date === selectedDate.toLocaleDateString("en-CA");

      return matchesStatus && matchesDate;
    });
  }, [data?.data, activeFilter, selectedDate]);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className="main_container w-full px-4 py-8 md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}

      <header className="mb-8">
        <h1 className="mb-6 font-serif text-3xl font-medium leading-tight text-app-secondary">
          Your appointments
        </h1>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-baseline lg:justify-between">
          {/* ================= FILTERS ================= */}

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <Button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  variant="ghost"
                  size="lg"
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

          {/* ================= DATE PICKER ================= */}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="justify-between gap-5"
              >
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
                    : "Select date"}
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

              {selectedDate && (
                <div className="border-t p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    Clear date
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* ================= APPOINTMENTS ================= */}

      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-app-lighter">
          <p className="text-base text-muted-foreground">
            No appointments found.
          </p>
        </div>
      )}
    </div>
  );
}
