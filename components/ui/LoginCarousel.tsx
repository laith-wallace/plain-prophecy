"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  image: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: "/images/login/babylon.png",
    quote: "Plain Prophecy hasn't just clarified my understanding of history; it has rewritten my future. The vision is breathtaking.",
    author: "Lulu Meyers",
    location: "London, UK",
    rating: 5,
  },
  {
    id: 2,
    image: "/images/login/beasts.png",
    quote: "I never thought the ancient symbols could feel so relevant today. The deep dives are truly enlightening.",
    author: "Marcus Thorne",
    location: "Sydney, Australia",
    rating: 5,
  },
  {
    id: 3,
    image: "/images/login/sanctuary.png",
    quote: "The sanctuary studies revealed a beauty in the gospel I'd completely missed. Truly life-changing perspective.",
    author: "Elena Petrova",
    location: "Sofia, Bulgaria",
    rating: 5,
  },
  {
    id: 4,
    image: "/images/login/community.png",
    quote: "Studying alongside such a diverse community has broadened my spirit. We are discovering truth together.",
    author: "David Chen",
    location: "Singapore",
    rating: 5,
  },
  {
    id: 5,
    image: "/images/login/cosmic.png",
    quote: "A cosmic revelation indeed. Everything from the cross to the crown finally makes sense in the grand design.",
    author: "Sarah Jenkins",
    location: "New York, USA",
    rating: 5,
  },
];

export default function LoginCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      {testimonials.map((t, index) => (
        <div
          key={t.id}
          className={`carousel-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${t.image})` }}
        >
          <div className="carousel-overlay">
            <div className="testimonial-card">
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h3>{t.author}</h3>
                  <p>{t.location}</p>
                </div>
                <div className="star-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="carousel-nav">
        <button onClick={prevSlide} className="nav-button" aria-label="Previous testimonial">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="nav-button" aria-label="Next testimonial">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
