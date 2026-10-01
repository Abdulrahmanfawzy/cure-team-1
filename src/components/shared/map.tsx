import {
  MapContainer,
  TileLayer,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export interface MapProps {
  center: [number, number]
  zoom?: number
  className?: string
  children?: React.ReactNode
}

const DEFAULT_ZOOM = 12

export function Map({
  center,
  zoom = DEFAULT_ZOOM,
  className = '',
  children,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className={`h-full w-full ${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
    </MapContainer>
  )
}