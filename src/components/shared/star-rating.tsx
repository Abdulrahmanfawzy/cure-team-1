interface StarRatingProps {
  rating?: number;
  count?: number;
}

export function StarRating({
  rating = 5,
  count = 5,
}: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${count} stars`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="text-app-gold"
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}