import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
type Review = {
  id: number;
  name: string;
  date: string;
  image: string;
  rating: number;
  comment: string;
};
export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card
      className="
        rounded-[19px]
        border-gray-200
        p-4
        shadow-none
      "
    >
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.image}
            alt={review.name}
            className="
              h-14
              w-14
              rounded-full
              object-cover
            "
          />

          <div>
            <h3 className="font-serif text-base ">{review.name}</h3>

            <p className="text-[15px] text-[#737985]">{review.date}</p>
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

          <span className="text-[15px] font-medium text-app-gold">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Comment */}
      <p className="mt-4 text-base leading-[1.35] text-[#626975]">
        {review.comment}
      </p>
    </Card>
  );
}
