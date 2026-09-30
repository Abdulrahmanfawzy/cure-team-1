/**
 * Shared UI components.
 *
 * Reusable, presentational components used across multiple features
 * (e.g. PageContainer, LoadingState, EmptyState, SearchInput).
 *
 * Rules:
 * - Feature-specific components stay in `features/<name>/components`
 * - Primitives (Button, Card, Dialog, ...) stay in `components/ui`
 * - No business logic / data fetching here
 */

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DoctorCard } from "./DoctorCard";
import { StarRating } from "./star-rating";
export { Map } from "./map";
export type { MapProps } from "./map";

export { MapMarker } from "./map-marker";
export type { MapMarkerProps } from "./map-marker";
export { Input, Label, DoctorCard, StarRating };
export type { DoctorCardData } from "./DoctorCard";
