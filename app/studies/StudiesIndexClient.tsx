"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StudyCardDeck from "@/components/studies/StudyCardDeck";
import StudyListView from "@/components/studies/StudyListView";
import StudiesViewToggle from "@/components/studies/StudiesViewToggle";

import "../studies-index.css";

const PREF_KEY = "pp-studies-view";

type BookFilter = "all" | "gospel" | "daniel" | "revelation";

export default function StudiesIndexClient() {
  const [view, setView] = useState<"card" | "list">("card");
  const [mounted, setMounted] = useState(false);
  const [bookFilter, setBookFilter] = useState<BookFilter>("all");

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
        <div className="si-header-left">
          {/* Sidebar trigger — reveals the hidden sidebar on index */}
          <SidebarTrigger className="si-sidebar-trigger" aria-label="Show study navigation" />
          <div className="si-header-text">
            <p className="si-eyebrow">Plain Prophecy</p>
            <h1 className="si-title">Studies</h1>
          </div>
        </div>

        <div className="si-header-controls">
          {/* Book filter */}
          <div className="si-filter-wrap">
            <select
              className="si-filter"
              value={bookFilter}
              onChange={(e) => setBookFilter(e.target.value as BookFilter)}
              aria-label="Filter by book"
            >
              <option value="all">All Books</option>
              <option value="gospel">The Gospel</option>
              <option value="daniel">Daniel</option>
              <option value="revelation">Revelation</option>
            </select>
            <span className="si-filter-chevron" aria-hidden="true">›</span>
          </div>

          {/* Map link */}
          <Link href="/studies/map" className="si-map-btn">
            ✦ The Map
          </Link>

          {/* Card / List toggle */}
          <StudiesViewToggle view={view} onChange={handleViewChange} />
        </div>
      </div>

      {mounted ? (
        <div className="si-content">
          {view === "card" ? (
            <StudyCardDeck bookFilter={bookFilter} />
          ) : (
            <StudyListView bookFilter={bookFilter} />
          )}
        </div>
      ) : (
        <div className="si-skeleton">
          <div className="si-skeleton-card" />
        </div>
      )}
    </div>
  );
}
