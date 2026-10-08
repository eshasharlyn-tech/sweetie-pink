import { useState } from "react";

export default function StarRating({ value = 0, onChange }) {
  const [hover, setHover] = useState(0);
  const active = hover || Math.round(value);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`text-xl ${onChange ? "cursor-pointer" : ""} ${
            star <= active ? "text-yellow-400" : "text-pink-200"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}