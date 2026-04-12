"use client";

import Link from "next/link";

interface GameTileProps {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
  progress: number; // 0–1
  color: string; // CSS color for the progress ring
  meta?: string; // e.g. "8 cards" or "3 levels"
  badge?: string; // e.g. "NEW"
}

const RING_SIZE = 52;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function GameTile({
  href,
  title,
  subtitle,
  icon,
  progress,
  color,
  meta,
  badge,
}: GameTileProps) {
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <Link href={href} className="game-tile">
      <div className="game-tile-ring-wrap">
        <svg
          className="game-tile-ring"
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        >
          {/* Background track */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={RING_STROKE}
          />
          {/* Progress arc */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            className="game-tile-ring-progress"
          />
        </svg>
        <span className="game-tile-icon" aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className="game-tile-info">
        <div className="game-tile-title">{title}</div>
        <div className="game-tile-subtitle">{subtitle}</div>
        {meta && <div className="game-tile-meta">{meta}</div>}
      </div>

      {badge && <span className="game-tile-badge">{badge}</span>}
    </Link>
  );
}
