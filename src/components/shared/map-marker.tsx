import { Marker, Tooltip } from "react-leaflet";

import type { DivIcon, Icon, LatLngExpression } from "leaflet";

import type { ReactNode } from "react";

export interface MapMarkerProps {
  position: LatLngExpression;
  icon?: Icon | DivIcon;
  tooltip?: ReactNode;
  tooltipClassName?: string;
  children?: ReactNode;
}

export function MapMarker({
  position,
  icon,
  tooltip,
  tooltipClassName,
  children,
}: MapMarkerProps) {
  return (
    <Marker position={position} icon={icon}>
      {tooltip && (
        <Tooltip
          direction="top"
          offset={[0, -8]}
          opacity={1}
          className={tooltipClassName}
        >
          {tooltip}
        </Tooltip>
      )}

      {children}
    </Marker>
  );
}
