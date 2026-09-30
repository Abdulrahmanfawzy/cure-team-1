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
import { StarRating } from "../shared/star-rating";
export { Input, Label, StarRating };
