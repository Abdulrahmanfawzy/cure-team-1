import { ChevronDown } from 'lucide-react'

import type {
  AvailabilityDate,
  ConsultationType,
  DoctorSort,
  Gender,
} from '../types/doctor.types'

interface DoctorFiltersProps {
  gender: Gender | null
  consultationType: ConsultationType | null
  availableDate: AvailabilityDate | null
  sort: DoctorSort

  onGenderChange: (
    value: Gender | null,
  ) => void

  onConsultationChange: (
    value: ConsultationType | null,
  ) => void

  onDateChange: (
    value: AvailabilityDate | null,
  ) => void

  onSortChange: (
    value: DoctorSort,
  ) => void
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-app-neutral-darker">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-5 rounded border-app-neutral accent-app-primary"
      />

      {label}
    </label>
  )
}

export function DoctorFilters({
  gender,
  consultationType,
  availableDate,
  sort,
  onGenderChange,
  onConsultationChange,
  onDateChange,
  onSortChange,
}: DoctorFiltersProps) {
  return (
    <aside className="w-39 shrink-0 space-y-5">
      <section>
        <h3 className="mb-3 text-sm font-medium text-app-secondary">
          Available Date
        </h3>

        <div className="space-y-3">
          <Checkbox
            checked={
              availableDate === 'today'
            }
            onChange={() =>
              onDateChange(
                availableDate === 'today'
                  ? null
                  : 'today',
              )
            }
            label="Today"
          />

          <Checkbox
            checked={
              availableDate === 'tomorrow'
            }
            onChange={() =>
              onDateChange(
                availableDate === 'tomorrow'
                  ? null
                  : 'tomorrow',
              )
            }
            label="Tomorrow"
          />
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-medium text-app-secondary">
          Gender
        </h3>

        <div className="flex gap-2">
          {(['male', 'female'] as Gender[]).map(
            (value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  onGenderChange(
                    gender === value
                      ? null
                      : value,
                  )
                }
                className={[
                  'h-9 rounded-lg border px-3 text-sm',

                  gender === value
                    ? 'border-app-primary bg-app-primary text-white'
                    : 'border-app-neutral-lighter text-app-neutral-darker',
                ].join(' ')}
              >
                {value === 'male'
                  ? 'Male'
                  : 'Female'}
              </button>
            ),
          )}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-medium text-app-secondary">
          Consultation Type
        </h3>

        <div className="space-y-3">
          <Checkbox
            checked={
              consultationType === 'In-clinic'
            }
            onChange={() =>
              onConsultationChange(
                consultationType ===
                  'In-clinic'
                  ? null
                  : 'In-clinic',
              )
            }
            label="In-clinic"
          />

          <Checkbox
            checked={
              consultationType ===
              'Home-Visit'
            }
            onChange={() =>
              onConsultationChange(
                consultationType ===
                  'Home-Visit'
                  ? null
                  : 'Home-Visit',
              )
            }
            label="Home Visit"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-app-secondary">
            Sort
          </h3>

          <ChevronDown size={17} />
        </div>

        <div className="space-y-3">
          <Checkbox
            checked={
              sort === 'most_recommended'
            }
            onChange={() =>
              onSortChange(
                'most_recommended',
              )
            }
            label="Most recommended"
          />

          <Checkbox
            checked={
              sort === 'price_low_to_high'
            }
            onChange={() =>
              onSortChange(
                'price_low_to_high',
              )
            }
            label="Price Low to high"
          />

          <Checkbox
            checked={
              sort === 'price_high_to_low'
            }
            onChange={() =>
              onSortChange(
                'price_high_to_low',
              )
            }
            label="Price High to low"
          />
        </div>
      </section>
    </aside>
  )
}