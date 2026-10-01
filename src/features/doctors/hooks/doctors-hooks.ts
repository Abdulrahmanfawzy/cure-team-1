import {
  useCallback,
  useState,
} from 'react'

import { useQuery } from '@tanstack/react-query'

import { useDebounce } from '@/hooks'

import { searchDoctors } from '../services/doctors.service'

import type {
  AvailabilityDate,
  ConsultationType,
  DoctorSort,
  Gender,
} from '../types/doctor.types'

const DEFAULT_SORT: DoctorSort =
  'most_recommended'

interface DoctorsQueryFilters {
  search: string
  major: string | null
  gender: Gender | null
  consultationType:
    | ConsultationType
    | null
  availableDate:
    | AvailabilityDate
    | null
  sort: DoctorSort
  page: number
}

export const doctorsQueryKey = (
  filters: DoctorsQueryFilters,
) =>
  ['doctors', filters] as const

export function useDoctors() {
  const [search, setSearch] =
    useState('')

  const [
    selectedSpecialty,
    setSelectedSpecialty,
  ] = useState<string | null>(null)

  const [gender, setGender] =
    useState<Gender | null>(null)

  const [
    consultationType,
    setConsultationType,
  ] =
    useState<ConsultationType | null>(
      null,
    )

  const [
    availableDate,
    setAvailableDate,
  ] =
    useState<AvailabilityDate | null>(
      null,
    )

  const [sort, setSort] =
    useState<DoctorSort>(
      DEFAULT_SORT,
    )

  const [page, setPage] =
    useState(1)

  const [showFilters, setShowFilters] =
    useState(false)

  const [showMap, setShowMap] =
    useState(false)

  const debouncedSearch =
    useDebounce(search, 400)

  const filters: DoctorsQueryFilters =
    {
      search: debouncedSearch,
      major: selectedSpecialty,
      gender,
      consultationType,
      availableDate,
      sort,
      page,
    }

  const query = useQuery({
    queryKey:
      doctorsQueryKey(filters),

    queryFn: () =>
      searchDoctors(filters),

    placeholderData: (
      previousData,
    ) => previousData,
  })

  const resetPage =
    useCallback(() => {
      setPage(1)
    }, [])

  const handleSearchChange =
    useCallback(
      (value: string) => {
        setSearch(value)
        resetPage()
      },
      [resetPage],
    )

  const handleSpecialtyChange =
    useCallback(
      (value: string | null) => {
        setSelectedSpecialty(
          value,
        )
        resetPage()
      },
      [resetPage],
    )

  const handleGenderChange =
    useCallback(
      (value: Gender | null) => {
        setGender(value)
        resetPage()
      },
      [resetPage],
    )

  const handleConsultationChange =
    useCallback(
      (
        value:
          | ConsultationType
          | null,
      ) => {
        setConsultationType(
          value,
        )
        resetPage()
      },
      [resetPage],
    )

  const handleDateChange =
    useCallback(
      (
        value:
          | AvailabilityDate
          | null,
      ) => {
        setAvailableDate(value)
        resetPage()
      },
      [resetPage],
    )

  const handleSortChange =
    useCallback(
      (value: DoctorSort) => {
        setSort(value)
        resetPage()
      },
      [resetPage],
    )

  const handlePreviousPage =
    useCallback(() => {
      setPage((currentPage) =>
        Math.max(
          1,
          currentPage - 1,
        ),
      )
    }, [])

  const handleNextPage =
    useCallback(() => {
      setPage((currentPage) => {
        const lastPage =
          query.data?.pagination
            .last_page ??
          currentPage

        return Math.min(
          lastPage,
          currentPage + 1,
        )
      })
    }, [
      query.data?.pagination
        .last_page,
    ])

  return {
    search,

    selectedSpecialty,

    gender,

    consultationType,

    availableDate,

    sort,

    showFilters,

    showMap,

    page,

    doctors:
      query.data?.doctors ?? [],

    pagination:
      query.data?.pagination,

    message:
      query.data?.message,

    isLoading:
      query.isLoading,

    isFetching:
      query.isFetching,

    isError:
      query.isError,

    error:
      query.error,

    canGoPrevious:
      page > 1,

    canGoNext:
      page <
      (query.data?.pagination
        .last_page ?? 1),

    setShowFilters,

    setShowMap,

    handleSearchChange,

    handleSpecialtyChange,

    handleGenderChange,

    handleConsultationChange,

    handleDateChange,

    handleSortChange,

    handlePreviousPage,

    handleNextPage,
  }
}