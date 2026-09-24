import { useMemo, useState } from "react";
import { DoctorFilters } from "../components/DoctorFilters";
import { DoctorList } from "../components/DoctorList";
import { DoctorSearchBar } from "../components/DoctorSearchBar";
import { SpecialtyFilters } from "../components/SpecialtyFilters";
import { doctors, specialties } from "../data/doctors.data";
import type { ConsultationType, Gender } from "../types/doctor.types";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );

  const [gender, setGender] = useState<Gender | null>(null);
  const [consultationType, setConsultationType] =
    useState<ConsultationType | null>(null);

  const [availableDate, setAvailableDate] = useState<
    "today" | "tomorrow" | null
  >(null);

  const [sort, setSort] = useState<"recommended" | "low" | "high">(
    "recommended",
  );

  const filteredDoctors = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    const result = doctors.filter((doctor) => {
      const matchesSearch =
        !normalizedSearch ||
        doctor.name.toLowerCase().includes(normalizedSearch) ||
        doctor.specialty.toLowerCase().includes(normalizedSearch) ||
        doctor.hospital.toLowerCase().includes(normalizedSearch);

      const matchesSpecialty =
        !selectedSpecialty || doctor.specialty === selectedSpecialty;

      const matchesGender = !gender || doctor.gender === gender;

      const matchesConsultation =
        !consultationType ||
        doctor.consultationTypes.includes(consultationType);

      const matchesDate =
        !availableDate ||
        (availableDate === "today"
          ? doctor.availableToday
          : doctor.availableTomorrow);

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesGender &&
        matchesConsultation &&
        matchesDate
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;

      return b.rating - a.rating;
    });
  }, [
    search,
    selectedSpecialty,
    gender,
    consultationType,
    availableDate,
    sort,
  ]);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="bg-white">
      <div className="main_container py-8">
        <DoctorSearchBar
          search={search}
          onSearchChange={setSearch}
          showFilters={showFilters}
          onFilterToggle={() => setShowFilters((prev) => !prev)}
        />

        <div className="mt-8 flex gap-7">
          {showFilters && (
            <DoctorFilters
              gender={gender}
              consultationType={consultationType}
              availableDate={availableDate}
              sort={sort}
              onGenderChange={setGender}
              onConsultationChange={setConsultationType}
              onDateChange={setAvailableDate}
              onSortChange={setSort}
            />
          )}

          <div className="min-w-0 flex-1">
            <SpecialtyFilters
              specialties={specialties}
              selected={selectedSpecialty}
              onSelect={setSelectedSpecialty}
            />

            <div className="mt-8">
              <DoctorList doctors={filteredDoctors} />
            </div>

            <div className="mt-10 flex justify-between">
              <button
                type="button"
                className="h-13 w-61.75 rounded-lg border border-app-primary text-app-primary
         transition-colors hover:bg-app-primary hover:text-white"
              >
                Previous Page
              </button>
              <button
                type="button"
                className="h-13 w-61.75 rounded-lg border border-app-primary text-app-primary 
        transition-colors hover:bg-app-primary hover:text-white"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
