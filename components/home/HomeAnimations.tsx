"use client";

import { useEffect } from "react";

export default function HomeAnimations() {
  useEffect(() => {
    // ── 0. Check for reduced motion preference ──
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Hero lines slide-in via CSS class ──
    const heroLines = document.querySelectorAll<HTMLElement>("[data-hero-line]");
    heroLines.forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add("hero-line-in");
        return;
      }
      const delay = parseInt(el.dataset.heroLine || "0", 10);
      setTimeout(() => {
        el.classList.add("hero-line-in");
      }, delay);
    });

    // ── 2. Hero element fade-ins ──
    const heroFadeEls = document.querySelectorAll<HTMLElement>("[data-hero-fade]");
    heroFadeEls.forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add("hero-fade-in");
        return;
      }
      const delay = parseInt(el.dataset.heroFade || "0", 10);
      setTimeout(() => {
        el.classList.add("hero-fade-in");
      }, delay);
    });

    // ── 3. IntersectionObserver for scroll-reveal elements ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            
            if (prefersReducedMotion) {
              el.classList.add("in-view");
              observer.unobserve(el);
              return;
            }

            const delay = el.dataset.animateDelay || "0";
            setTimeout(() => {
              el.classList.add("in-view");
              
              // If it's a timeline node, add additional pulse effect
              if (el.classList.contains("timeline-node")) {
                const dot = el.querySelector(".timeline-dot");
                if (dot) {
                  dot.classList.add("pulse-once");
                }
              }
            }, parseInt(delay, 10));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 } // Lowered threshold for better mobile experience
    );

    document
      .querySelectorAll<HTMLElement>("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
