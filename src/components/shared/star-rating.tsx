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
      {Array.from({ length: count }).map((_, index) => {
        const isFilled = index < Math.round(rating);

        return (
          <span
            key={index}
            className={
              isFilled
                ? "text-app-gold"
                : "text-gray-300"
            }
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
}