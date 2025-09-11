// src/components/TestimonialCarousel.tsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ritika Sharma",
    meta: "Jaipur — Home Renovation",
    rating: 5,
    quote:
      "The team transformed our house into a dream home. Fantastic attention to detail and timely delivery.",
  },
  {
    name: "Amit Verma",
    meta: "Udaipur — Office Fitout",
    rating: 4,
    quote:
      "Very professional and collaborative. The workspace looks modern and functions perfectly.",
  },
  {
    name: "Neha & Raj",
    meta: "Jodhpur — Apartment",
    rating: 5,
    quote:
      "We loved the 3D visuals — it made decisions so much easier. The result exceeded expectations.",
  },
];

const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[index];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center mb-2">
              <h4 className="font-semibold text-gray-900 mr-3">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.meta}</span>
            </div>
            <div className="flex items-center text-yellow-400 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} />
              ))}
            </div>
            <p className="text-gray-700">{t.quote}</p>
          </div>

          <div className="hidden md:flex flex-col space-y-2 items-center">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="p-2 rounded-full bg-white/60 hover:bg-white"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="p-2 rounded-full bg-white/60 hover:bg-white"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-gray-300"}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
