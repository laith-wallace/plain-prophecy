"use client";

import { useEffect, useRef } from "react";

interface ParticleBurstProps {
  x: number; // center X relative to parent
  y: number; // center Y relative to parent
  count?: number;
  color?: string;
  onDone?: () => void;
}

export function ParticleBurst({
  x,
  y,
  count = 14,
  color = "#C9A84C",
  onDone,
}: ParticleBurstProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const angle = (2 * Math.PI * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 40 + Math.random() * 60;
      const size = 3 + Math.random() * 4;
      const duration = 400 + Math.random() * 200;

      p.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        opacity: 1;
      `;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      el.appendChild(p);
      particles.push(p);

      const anim = p.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          {
            transform: `translate(${dx}px, ${dy}px) scale(0.2)`,
            opacity: 0,
          },
        ],
        {
          duration,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "forwards",
        },
      );

      anim.onfinish = () => p.remove();
    }

    const timeout = setTimeout(() => {
      onDone?.();
    }, 700);

    return () => {
      clearTimeout(timeout);
      particles.forEach((p) => p.remove());
    };
  }, [x, y, count, color, onDone]);

  return (
    <div
      ref={ref}
      className="particle-burst-container"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    />
  );
}
