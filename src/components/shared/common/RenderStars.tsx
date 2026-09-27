import { Star } from "lucide-react";

export default function RenderStars({ rating }: { rating: number }) {
  return Array.from({ length: 5 }).map((_, index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

    return (
      <div key={index} className="relative">
        <Star
          size={23}
          strokeWidth={1}
          className="text-app-gold"
          fill="transparent"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star
            size={23}
            strokeWidth={1}
            className="text-app-gold"
            fill="#FFD900"
          />
        </div>
      </div>
    );
  });
}
