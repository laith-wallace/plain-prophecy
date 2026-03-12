"use client";

import React, { useState, useEffect } from "react";
import StudyCardDeck from "@/components/studies/StudyCardDeck";
import StudyListView from "@/components/studies/StudyListView";
import StudiesViewToggle from "@/components/studies/StudiesViewToggle";

const PREF_KEY = "pp-studies-view";

export default function StudiesIndexPage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [mounted, setMounted] = useState(false);

  // Hydrate view preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(PREF_KEY);
    if (stored === "list" || stored === "card") setView(stored);
    setMounted(true);
  }, []);

  const handleViewChange = (v: "card" | "list") => {
    setView(v);
    localStorage.setItem(PREF_KEY, v);
  };

  return (
    <div className="si-root">
      {/* Page header */}
      <div className="si-header">
        <div className="si-header-text">
          <p className="si-eyebrow">Plain Prophecy</p>
          <h1 className="si-title">Studies</h1>
        </div>
        <StudiesViewToggle view={view} onChange={handleViewChange} />
      </div>

      {/* Content — suppress until localStorage hydrated to avoid flicker */}
      {mounted && (
        <div className="si-content">
          {view === "card" ? <StudyCardDeck /> : <StudyListView />}
        </div>
      )}

      {/* Pre-hydration skeleton */}
      {!mounted && (
        <div className="si-skeleton">
          <div className="si-skeleton-card" />
        </div>
      )}
    </div>
  );
}
