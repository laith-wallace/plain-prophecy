"use client";

import React from "react";

interface Props {
  view: "card" | "list";
  onChange: (v: "card" | "list") => void;
}

// Card view icon
function CardIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0.45 }}
    >
      <rect x="2" y="2" width="6" height="8" rx="1.5" fill="currentColor" />
      <rect x="10" y="2" width="6" height="8" rx="1.5" fill="currentColor" />
      <rect x="2" y="12" width="6" height="4" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="10" y="12" width="6" height="4" rx="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// List view icon
function ListIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0.45 }}
    >
      <rect x="2" y="3" width="14" height="2.5" rx="1.25" fill="currentColor" />
      <rect x="2" y="7.75" width="14" height="2.5" rx="1.25" fill="currentColor" />
      <rect x="2" y="12.5" width="14" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  );
}

export default function StudiesViewToggle({ view, onChange }: Props) {
  return (
    <div className="svt-root" role="group" aria-label="Study view">
      <button
        className={`svt-btn ${view === "card" ? "svt-btn--active" : ""}`}
        onClick={() => onChange("card")}
        aria-pressed={view === "card"}
        aria-label="Card view"
      >
        <CardIcon active={view === "card"} />
      </button>
      <button
        className={`svt-btn ${view === "list" ? "svt-btn--active" : ""}`}
        onClick={() => onChange("list")}
        aria-pressed={view === "list"}
        aria-label="List view"
      >
        <ListIcon active={view === "list"} />
      </button>
    </div>
  );
}
