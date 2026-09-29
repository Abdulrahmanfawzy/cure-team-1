import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "../types/appointment.types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card
      className="
        rounded-3xl
        border-gray-300
        p-4
        shadow-none
      "
    >
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.patient.profile_image}
            alt={review.patient.name}
            className="
              h-14
              w-14
              rounded-full
              object-cover
            "
          />

          <div>
            <h3 className="font-serif text-base ">{review.patient.name}</h3>

            <p className="text-base text-app-neutral-lighter">
              {review.created_at_human}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 rounded-xl bg-[#FFFBE4] px-2 py-1">
          <Star
            size={19}
            fill="#FFD900"
            strokeWidth={1}
            className="text-app-gold"
          />

          <span className="text-base font-medium text-app-gold">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Comment */}
      <p className=" text-base leading-[1.35] text-app-neutral">
        {review.comment}
      </p>
    </Card>
  );
}
