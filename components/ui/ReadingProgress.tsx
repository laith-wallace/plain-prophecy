"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Calculate how far the user has scrolled
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const scrolledPercentage = (currentScrollY / scrollHeight) * 100;
        setProgress(Math.min(Math.max(scrolledPercentage, 0), 100));
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    // Initialize on mount
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "rgba(0,0,0,0.1)", // Subtle background track
        zIndex: 9999, // Ensure it sits above the header/navigation
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "var(--sda-accent, #e8a020)",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
