import { StarRating } from "@/components/shared/star-rating";

import { useReviews } from "../hooks/use-home";
import { getImageUrl } from "@/utils/image-url";

export function ReviewsSection() {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useReviews();

  if (isLoading) {
    return (
      <section className="pb-20 md:pb-24">
        <div className="main_container">
          <div className="mx-auto max-w-125 text-center">
            <div className="mx-auto h-16 w-48 animate-pulse rounded bg-app-neutral-lightest" />

            <div className="mx-auto mt-6 h-5 w-24 animate-pulse rounded bg-app-neutral-lightest" />

            <div className="mx-auto mt-4 h-10 w-72 animate-pulse rounded bg-app-neutral-lightest" />

            <div className="mt-8 flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="size-14 animate-pulse rounded-full bg-app-neutral-lightest"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || reviews.length === 0) {
    return null;
  }

  const averageRating =
    reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0,
    ) / reviews.length;

  const featuredReview = reviews[0];

  return (
    <section className="pb-20 md:pb-24">
      <div className="main_container">
        <div className="mx-auto max-w-125 text-center">
          <h2 className="font-serif text-2xl leading-tight text-app-secondary md:text-3xl">
            Reviews
            <br />
            That Speak for Themselves
          </h2>

          <div className="mt-6 flex items-center justify-center gap-2 text-lg md:mt-8 md:text-xl">
            <StarRating rating={averageRating} />

            <span className="text-xs font-medium text-app-secondary">
              {averageRating.toFixed(1)}
            </span>
          </div>

          <blockquote className="mx-auto mt-4 max-w-90 text-xs leading-4 text-app-neutral-darker">
            “{featuredReview.comment}”
          </blockquote>

          <p className="mt-2 text-[10px] font-medium text-app-secondary">
            {featuredReview.patient.name}
          </p>

          <div className="mt-8 flex items-end justify-center gap-4">
            {reviews.slice(0, 5).map((review, index) => (
              <img
                key={review.id}
                src={getImageUrl(review.patient.profile_image)}
                alt={review.patient.name}
                className={
                  index === 2
                    ? "size-18 rounded-full object-cover"
                    : "size-14 rounded-full object-cover"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}