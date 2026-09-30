import { specialties } from '../data/doctors.data'
import { useDoctors } from '../hooks/doctors-hooks'

import { DoctorFilters } from './DoctorFilters'
import { DoctorList } from './DoctorList'
import { DoctorSearchBar } from './DoctorSearchBar'
import { SpecialtyFilters } from './SpecialtyFilters'

export function DoctorsPageView() {
  const {
    search,
    selectedSpecialty,
    gender,
    consultationType,
    availableDate,
    sort,
    showFilters,

    doctors,

    message,

    isLoading,
    isFetching,

    canGoPrevious,
    canGoNext,

    setShowFilters,

    handleSearchChange,
    handleSpecialtyChange,
    handleGenderChange,
    handleConsultationChange,
    handleDateChange,
    handleSortChange,
    handlePreviousPage,
    handleNextPage,
  } = useDoctors()

  return (
    <div className="bg-white">
      <div className="main_container py-8">
        <DoctorSearchBar
          search={search}
          onSearchChange={
            handleSearchChange
          }
          showFilters={showFilters}
          onFilterToggle={() =>
            setShowFilters(
              (previous) => !previous,
            )
          }
        />

        <div className="mt-8 flex gap-7">
          {showFilters && (
            <DoctorFilters
              gender={gender}
              consultationType={
                consultationType
              }
              availableDate={availableDate}
              sort={sort}
              onGenderChange={
                handleGenderChange
              }
              onConsultationChange={
                handleConsultationChange
              }
              onDateChange={
                handleDateChange
              }
              onSortChange={
                handleSortChange
              }
            />
          )}

          <div className="min-w-0 flex-1">
            <SpecialtyFilters
              specialties={specialties}
              selected={
                selectedSpecialty
              }
              onSelect={
                handleSpecialtyChange
              }
            />

            <div className="relative mt-8">
              <DoctorList
                doctors={doctors}
                isLoading={isLoading}
                emptyMessage={message}
              />

              {isFetching &&
                !isLoading && (
                  <span className="absolute right-2 top-2 text-xs text-app-neutral">
                    Updating...
                  </span>
                )}
            </div>

            <div className="mt-10 flex justify-between">
              <button
                type="button"
                disabled={
                  !canGoPrevious
                }
                onClick={
                  handlePreviousPage
                }
                className="h-13 w-61.75 rounded-lg border border-app-primary text-app-primary transition-colors hover:bg-app-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-app-primary"
              >
                Previous Page
              </button>

              <button
                type="button"
                disabled={
                  !canGoNext
                }
                onClick={
                  handleNextPage
                }
                className="h-13 w-61.75 rounded-lg border border-app-primary text-app-primary transition-colors hover:bg-app-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-app-primary"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}