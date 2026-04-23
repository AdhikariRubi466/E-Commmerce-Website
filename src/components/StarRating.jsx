import { Star } from 'lucide-react';

export default function StarRating({ rating, reviews, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i < rating;
    return { filled, half };
  });

  const starSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {stars.map((s, i) => (
          <Star
            key={i}
            className={`${starSize} ${s.filled ? 'fill-amazon-orange text-amazon-orange' : s.half ? 'fill-amazon-orange/50 text-amazon-orange' : 'fill-gray-200 text-gray-200'}`}
          />
        ))}
      </div>
      <span className={`text-amazon-orange font-medium ${size === 'lg' ? 'text-base' : 'text-xs'}`}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={`text-gray-500 ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
