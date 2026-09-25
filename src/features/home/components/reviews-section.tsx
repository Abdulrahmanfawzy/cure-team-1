import { reviews } from "../constants/home-data";
import { StarRating } from "@/components/shared";
export function ReviewsSection() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="main_contaoner">
        <div className="mx-auto max-w-125 text-center">
          <h2 className="font-serif text-2xl leading-tight text-app-secondary md:text-3xl">
            Reviews
            <br />
            That Speak for Themselves
          </h2>

          <div className="mt-6 text-lg flex items-center justify-center gap-2 text-app-primary md:mt-8 md:text-xl">
            <StarRating rating={4.9} />
          </div>

          <blockquote className="mx-auto mt-4 max-w-90 text-xs leading-4 text-app-neutral-darker">
            “Quick and easy booking! I found a great dermatologist near me and
            booked an appointment in just a few minutes.”
          </blockquote>

          <div className="mt-8 flex items-end justify-center gap-6">
            {reviews.map((review, index) => (
              <img
                key={review.id}
                src={review.image}
                alt=""
                className={`
                  rounded-full object-cover
                  ${index === 2 ? "size-18" : "size-14"}
                `}
              />
            ))}
          </div>

          
        </div>
      </div>
    </section>
  );
}