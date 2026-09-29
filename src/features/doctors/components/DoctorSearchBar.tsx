import { ChevronLeft, Map, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DoctorSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onFilterToggle: () => void;
}

export function DoctorSearchBar({
  search,
  onSearchChange,
  showFilters,
  onFilterToggle,
}: DoctorSearchBarProps) {
  return (
    <div className=" flex gap-6">
      <button
        type="button"
        onClick={onFilterToggle}
        className={[
          "flex h-13 w-39 shrink-0 items-center justify-between overflow-hidden rounded-[10px] border bg-white transition-colors",
          showFilters
            ? "border-app-primary text-app-primary"
            : "border-app-neutral-lighter text-app-neutral-darker",
        ].join(" ")}
      >
        <span className="flex items-center gap-3 px-4">
          <SlidersHorizontal size={18} />
          Filter
        </span>

        <span className="flex h-full w-9.5 items-center justify-center border-l border-inherit">
          <ChevronLeft
            size={18}
            className={showFilters ? "rotate-90" : "-rotate-90"}
          />
        </span>
      </button>
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-app-neutral"
        />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search doctors"
          className="h-13 rounded-[10px] pl-11 text-sm"
        />
      </div>

      <button
        type="button"
        className="flex h-13 w-29 items-center justify-center gap-3 rounded-[10px] border border-app-neutral-lighter text-app-neutral-darker"
      >
        <Map size={18} />
        Map
      </button>
    </div>
  );
}
