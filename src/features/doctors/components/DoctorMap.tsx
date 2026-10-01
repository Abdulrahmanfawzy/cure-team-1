import { useEffect, useMemo } from "react";

import L from "leaflet";

import { useMap } from "react-leaflet";

import { Map, MapMarker } from "@/components/shared";

import type { Doctor } from "../types/doctor.types";

import "./DoctorMap.css";

import { DoctorMapCard } from "./DoctorMapCard";

interface DoctorMapProps {
  doctors: Doctor[];
}

const DEFAULT_CENTER: [number, number] = [20, 0];

function MapBounds({ doctors }: DoctorMapProps) {
  const map = useMap();

  useEffect(() => {
    if (!doctors.length) {
      return;
    }

    const bounds = L.latLngBounds(
      doctors.map((doctor) => [doctor.latitude, doctor.longitude]),
    );

    map.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 12,
    });
  }, [doctors, map]);

  return null;
}

function DoctorMarker({ doctor }: { doctor: Doctor }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "doctor-map-marker",

        html: `
          <div
            class="doctor-map-marker__pin"
            aria-hidden="true"
          >
            <span></span>
          </div>
        `,

        iconSize: [32, 40],

        iconAnchor: [16, 40],

        tooltipAnchor: [0, -32],
      }),
    [],
  );

  return (
    <MapMarker
      position={[doctor.latitude, doctor.longitude]}
      icon={icon}
      tooltipClassName="doctor-map-tooltip"
      tooltip={<DoctorMapCard doctor={doctor} />}
    />
  );
}

export function DoctorMap({ doctors }: DoctorMapProps) {
  const center = doctors.length
    ? ([doctors[0].latitude, doctors[0].longitude] as [number, number])
    : DEFAULT_CENTER;

  return (
    <div className="relative mt-8 h-[min(70vh,640px)] min-h-105 overflow-hidden rounded-xl border border-app-neutral-lighter">
      <Map center={center} zoom={12}>
        <MapBounds doctors={doctors} />

        {doctors.map((doctor) => (
          <DoctorMarker key={doctor.id} doctor={doctor} />
        ))}
      </Map>

      {!doctors.length && (
        <div className="pointer-events-none absolute inset-0 z-1000 flex items-center justify-center bg-white/60">
          <p className="rounded-lg bg-white px-4 py-3 text-sm text-app-neutral-darker shadow">
            No doctors found for the current filters.
          </p>
        </div>
      )}
    </div>
  );
}
