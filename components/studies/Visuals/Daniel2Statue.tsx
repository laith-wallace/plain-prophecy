"use client";

import React from "react";
import Image from "next/image";

interface Daniel2StatueProps {
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
}

const STATUE_IMAGES = [
  { id: "gold", src: "/daniel 2 pngs/1. babylon-head.png", label: "Gold (Babylon)" },
  { id: "silver", src: "/daniel 2 pngs/2. medo-persia.png", label: "Silver (Medo-Persia)" },
  { id: "bronze", src: "/daniel 2 pngs/3. Greece.png", label: "Bronze (Greece)" },
  { id: "iron", src: "/daniel 2 pngs/4. legs of iron.png", label: "Iron (Rome)" },
  { id: "clay", src: "/daniel 2 pngs/5. feet-iron-clay.png", label: "Iron & Clay (Divided Europe)" },
  { id: "stone", src: "/daniel 2 pngs/5. feet-iron-clay.png", label: "The Stone (Eternal Kingdom)" },
];

export default function Daniel2Statue({ activeSection, onSectionSelect }: Daniel2StatueProps) {
  const currentIndex = STATUE_IMAGES.findIndex((img) => img.id === activeSection);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (safeIndex - 1 + STATUE_IMAGES.length) % STATUE_IMAGES.length;
    onSectionSelect(STATUE_IMAGES[prevIndex].id);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (safeIndex + 1) % STATUE_IMAGES.length;
    onSectionSelect(STATUE_IMAGES[nextIndex].id);
  };

  return (
    <div className="statue-carousel">
      <div className="carousel-main">
        {/* Navigation Arrows Overlay */}
        <button 
          className="carousel-arrow left" 
          onClick={handlePrev} 
          aria-label="Previous section"
        >
          <span>&#8592;</span>
        </button>
        
        <div className="carousel-image-container">
          {STATUE_IMAGES.map((item, idx) => (
            <div 
              key={item.id} 
              className={`carousel-slide ${idx === safeIndex ? 'active' : ''}`}
              onClick={() => onSectionSelect(item.id)}
            >
              <div className="image-wrapper">
                <Image 
                  src={item.src} 
                  alt={item.label}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, 340px"
                />
              </div>
              
              {item.id === "stone" && (
                <div className="stone-visual-overlay">
                  <div className="stone-glow-effect"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          className="carousel-arrow right" 
          onClick={handleNext} 
          aria-label="Next section"
        >
          <span>&#8594;</span>
        </button>
      </div>

      {/* Indicators synced with parent state */}
      <div className="carousel-indicators">
        {STATUE_IMAGES.map((item, idx) => (
          <button
            key={item.id}
            className={`indicator-dot ${idx === safeIndex ? 'active' : ''}`}
            onClick={() => onSectionSelect(item.id)}
            title={item.label}
          />
        ))}
      </div>
    </div>
  );
}
