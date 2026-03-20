"use client";

import { useState } from "react";
import {
  empireRows,
  VISIONS,
  type EmpireRow,
  type VisionCell,
} from "@/data/parallels";
import { ScriptureRef } from "@/components/ui/ScriptureRef";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

/** Dark gradient tinted to the empire's metal — matching InteractiveStudyTemplate's getCardStyle */
function empireGradient(id: string): string {
  switch (id) {
    case "babylon":    return "linear-gradient(160deg, #2A1F00 0%, #0F0C00 100%)";
    case "medo-persia":return "linear-gradient(160deg, #0D1A22 0%, #060E14 100%)";
    case "greece":     return "linear-gradient(160deg, #1A0F05 0%, #0A0602 100%)";
    case "rome":       return "linear-gradient(160deg, #0A1018 0%, #040608 100%)";
    case "divided":    return "linear-gradient(160deg, #100A08 0%, #060404 100%)";
    case "kingdom":    return "linear-gradient(160deg, #1A1A0A 0%, #0A0A04 100%)";
    default:           return "linear-gradient(160deg, #0D0D12 0%, #08080F 100%)";
  }
}

// ─── Vision column header ─────────────────────────────────────────────────────

function VisionColHeader({ visionId }: { visionId: string }) {
  const v = VISIONS.find((v) => v.id === visionId)!;
  return (
    <div className="pp-vision-header">
      <div className="pp-vision-header-top">
        <span className="pp-vision-icon">{v.icon}</span>
        <div>
          <div className="pp-vision-label">{v.label}</div>
          <ScriptureRef className="pp-vision-ref">{v.scripture}</ScriptureRef>
        </div>
      </div>
      <div className="pp-vision-subtitle">{v.subtitle}</div>
      {v.columnNote && (
        <div className="pp-vision-note">{v.columnNote}</div>
      )}
    </div>
  );
}

// ─── Individual vision cell ───────────────────────────────────────────────────

function VisionCellView({
  cell,
}: {
  cell: VisionCell;
}) {
  if (!cell.present) {
    return (
      <div className="pp-cell-empty">
        <span className="pp-cell-empty-dash">—</span>
        <span className="pp-cell-empty-label">not in this vision</span>
      </div>
    );
  }

  return (
    <div className="pp-cell">
      <div className="pp-cell-top">
        <span className="pp-cell-symbol">{cell.symbol}</span>
        <span className="pp-cell-name">{cell.symbolName}</span>
      </div>
      {cell.scripture
        ? <ScriptureRef className="pp-cell-ref">{cell.scripture}</ScriptureRef>
        : <div className="pp-cell-ref" />}
      <div className="pp-cell-quote">{cell.keyLine}</div>
    </div>
  );
}

// ─── Expanded detail panel ────────────────────────────────────────────────────

function DetailPanel({ empire }: { empire: EmpireRow }) {
  const presentCells = empire.cells.filter((c) => c.present);

  return (
    <div
      className="pp-detail-panel"
      style={{ background: empireGradient(empire.id) }}
    >
      {/* Convergence note */}
      <div className="pp-detail-note">
        <span
          className="pp-detail-note-pip"
          style={{ background: empire.color }}
        />
        <p className="pp-detail-note-text">{empire.convergenceNote}</p>
      </div>

      {/* Per-vision breakdowns */}
      <div className="pp-detail-grid">
        {presentCells.map((cell) => {
          const vision = VISIONS.find((v) => v.id === cell.visionId)!;
          return (
            <div
              key={cell.visionId}
              className="pp-detail-card"
              style={{ borderLeftColor: empire.color }}
            >
              <div
                className="pp-detail-card-ref"
                style={{ color: empire.color }}
              >
                {vision.label} · {cell.scripture
                  ? <ScriptureRef style={{ color: empire.color }}>{cell.scripture}</ScriptureRef>
                  : null}
              </div>
              <div className="pp-detail-card-name">
                {cell.symbol} {cell.symbolName}
              </div>
              <div className="pp-detail-card-quote">{cell.keyLine}</div>
              <div className="pp-detail-card-body">{cell.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop grid ─────────────────────────────────────────────────────────────

function DesktopGrid({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="pp-grid-scroll">
      <div className="pp-grid">
        {/* Header row — corner cell */}
        <div className="pp-grid-corner">
          <span className="pp-grid-corner-label">Empire</span>
        </div>

        {/* Header row — vision columns */}
        {VISIONS.map((v) => (
          <div key={v.id} className="pp-grid-header-cell">
            <VisionColHeader visionId={v.id} />
          </div>
        ))}

        {/* Data rows */}
        {empireRows.map((empire) => {
          const isActive = selected === empire.id;
          const rgb = hexToRgb(empire.color);

          return [
            /* Empire label cell */
            <button
              key={`${empire.id}-label`}
              className={`pp-empire-label${isActive ? " pp-empire-label--active" : ""}`}
              style={{
                borderLeftColor: empire.color,
                background: isActive
                  ? `rgba(${rgb}, 0.1)`
                  : "transparent",
              }}
              onClick={() => onSelect(empire.id)}
              aria-expanded={isActive}
            >
              <span className="pp-empire-name">{empire.name}</span>
              <span className="pp-empire-era">{empire.era}</span>
              <span
                className="pp-empire-toggle"
                style={{ color: isActive ? empire.color : undefined }}
              >
                {isActive ? "▲ collapse" : "▼ expand"}
              </span>
            </button>,

            /* Vision cells */
            ...empire.cells.map((cell) => (
              <button
                key={`${empire.id}-${cell.visionId}`}
                className={`pp-data-cell${isActive ? " pp-data-cell--active" : ""}`}
                style={{
                  background: isActive
                    ? `rgba(${rgb}, 0.06)`
                    : "transparent",
                }}
                onClick={() => onSelect(empire.id)}
                tabIndex={-1}
              >
                <VisionCellView cell={cell} />
              </button>
            )),

            /* Detail panel — spans full width when active */
            isActive ? (
              <div key={`${empire.id}-detail`} className="pp-detail-row">
                <DetailPanel empire={empire} />
              </div>
            ) : null,
          ];
        })}
      </div>
    </div>
  );
}

// ─── Mobile view ──────────────────────────────────────────────────────────────

function MobileView({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const empire = empireRows.find((r) => r.id === selected) ?? null;

  return (
    <div className="pp-mobile">
      {/* Empire pill strip */}
      <div className="pp-mobile-pills">
        {empireRows.map((row) => {
          const active = selected === row.id;
          const rgb = hexToRgb(row.color);
          return (
            <button
              key={row.id}
              className="pp-pill"
              style={{
                borderColor: active ? row.color : "rgba(255,255,255,0.15)",
                background: active ? `rgba(${rgb}, 0.18)` : "transparent",
                color: active ? row.color : "rgba(255,255,255,0.55)",
                fontWeight: active ? 700 : 400,
              }}
              onClick={() => onSelect(row.id)}
            >
              {row.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {!empire ? (
        <div className="pp-mobile-empty">
          <span className="pp-mobile-empty-icon">✦</span>
          <p className="pp-mobile-empty-text">
            Tap an empire to see how all four visions describe it.
          </p>
        </div>
      ) : (
        <div className="pp-mobile-cards">
          {/* Empire heading */}
          <div
            className="pp-mobile-heading"
            style={{
              borderLeftColor: empire.color,
              background: empireGradient(empire.id),
            }}
          >
            <div className="pp-mobile-heading-name">{empire.name}</div>
            <div className="pp-mobile-heading-era">{empire.era}</div>
            <div className="pp-mobile-heading-note">{empire.convergenceNote}</div>
          </div>

          {/* One card per vision */}
          {empire.cells.map((cell) => {
            const vision = VISIONS.find((v) => v.id === cell.visionId)!;

            if (!cell.present) {
              return (
                <div key={cell.visionId} className="pp-mobile-card pp-mobile-card--absent">
                  <span className="pp-mobile-card-icon pp-mobile-card-icon--absent">
                    {vision.icon}
                  </span>
                  <div>
                    <div className="pp-mobile-card-vision-label">{vision.label}</div>
                    <div className="pp-mobile-card-absent-text">
                      — not in this vision
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={cell.visionId}
                className="pp-mobile-card"
                style={{ borderLeftColor: empire.color }}
              >
                <div className="pp-mobile-card-meta">
                  <span className="pp-mobile-card-icon">{vision.icon}</span>
                  <span
                    className="pp-mobile-card-vision-label"
                    style={{ color: empire.color }}
                  >
                    {vision.label} · {cell.scripture
                      ? <ScriptureRef style={{ color: empire.color }}>{cell.scripture}</ScriptureRef>
                      : null}
                  </span>
                </div>
                <div className="pp-mobile-card-name">
                  {cell.symbol} {cell.symbolName}
                </div>
                <div className="pp-mobile-card-quote">{cell.keyLine}</div>
                <div className="pp-mobile-card-desc">{cell.description}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProphecyParallels() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <style>{`
        /* ── Layout ──────────────────────────────────────────────────────── */
        .pp-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 4vw, 2rem) clamp(4rem, 10vw, 7rem);
        }

        /* ── Desktop grid ────────────────────────────────────────────────── */
        .pp-grid-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .pp-grid {
          display: grid;
          grid-template-columns: 170px repeat(4, 1fr);
          min-width: 760px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          background: #08080F;
        }

        /* Header cells */
        .pp-grid-corner {
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }
        .pp-grid-corner-label {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .pp-grid-header-cell {
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          border-top: 2px solid #C9A84C;
        }
        .pp-grid-header-cell:last-child {
          border-right: none;
        }

        /* Vision header internals */
        .pp-vision-header {
          padding: 0.875rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .pp-vision-header-top {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .pp-vision-icon { font-size: 1.375rem; line-height: 1; }
        .pp-vision-label {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-weight: 700;
          font-size: 0.875rem;
          color: #fff;
          line-height: 1.2;
        }
        .pp-vision-ref {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 1px;
        }
        .pp-vision-subtitle {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.45);
          font-style: italic;
        }
        .pp-vision-note {
          margin-top: 0.35rem;
          font-size: 0.6875rem;
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
          padding: 0.375rem 0.5rem;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          border-left: 2px solid rgba(201,168,76,0.35);
        }

        /* Empire label column */
        .pp-empire-label {
          all: unset;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 1rem 0.875rem;
          cursor: pointer;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.08);
          border-left: 4px solid;
          transition: background var(--dur-fast, 180ms) ease;
          width: 170px;
        }
        .pp-empire-label:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: -2px;
        }
        .pp-empire-name {
          font-family: 'Cinzel', var(--font-playfair, 'Playfair Display'), serif;
          font-size: 0.9375rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
        }
        .pp-empire-era {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }
        .pp-empire-toggle {
          margin-top: 0.4rem;
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          transition: color var(--dur-fast, 180ms) ease;
        }

        /* Vision data cells */
        .pp-data-cell {
          all: unset;
          box-sizing: border-box;
          display: block;
          width: 100%;
          cursor: pointer;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background var(--dur-fast, 180ms) ease;
        }
        .pp-data-cell:last-of-type { border-right: none; }

        /* Cell content */
        .pp-cell {
          padding: 0.875rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .pp-cell-top {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .pp-cell-symbol { font-size: 1.25rem; line-height: 1; }
        .pp-cell-name {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-weight: 700;
          font-size: 0.8125rem;
          color: #fff;
          line-height: 1.3;
        }
        .pp-cell-ref {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .pp-cell-quote {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.8125rem;
          font-style: italic;
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
        }

        /* Empty cell */
        .pp-cell-empty {
          padding: 0.875rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 88px;
          gap: 0.3rem;
          border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 8px;
          margin: 0.375rem;
        }
        .pp-cell-empty-dash {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.15);
          line-height: 1;
        }
        .pp-cell-empty-label {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-align: center;
        }

        /* Detail panel row */
        .pp-detail-row {
          grid-column: 1 / -1;
          border-top: 1px solid rgba(255,255,255,0.06);
          animation: pp-expand 280ms cubic-bezier(0.2, 0.9, 0.3, 1) both;
        }
        @keyframes pp-expand {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pp-detail-panel {
          padding: clamp(1.25rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .pp-detail-note {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .pp-detail-note-pip {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .pp-detail-note-text {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.875rem;
          font-style: italic;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          margin: 0;
        }

        .pp-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .pp-detail-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 3px solid;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .pp-detail-card-ref {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          filter: brightness(1.35);
        }
        .pp-detail-card-name {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-weight: 700;
          font-size: 0.9375rem;
          color: #fff;
          line-height: 1.2;
        }
        .pp-detail-card-quote {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.8125rem;
          font-style: italic;
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
        }
        .pp-detail-card-body {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 0.45rem;
          margin-top: 0.1rem;
        }

        /* ── Mobile ──────────────────────────────────────────────────────── */
        .pp-mobile {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .pp-mobile-pills {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 2px;
          scrollbar-width: none;
        }
        .pp-mobile-pills::-webkit-scrollbar { display: none; }

        .pp-pill {
          all: unset;
          box-sizing: border-box;
          flex-shrink: 0;
          padding: 0.45rem 1rem;
          border-radius: 20px;
          border: 1.5px solid;
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--dur-fast, 180ms) ease;
          min-height: 36px;
          display: flex;
          align-items: center;
          filter: brightness(1.25);
        }
        .pp-pill:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 2px;
        }

        .pp-mobile-empty {
          padding: 3rem 1.5rem;
          text-align: center;
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .pp-mobile-empty-icon {
          font-size: 1.5rem;
          color: #C9A84C;
          opacity: 0.6;
        }
        .pp-mobile-empty-text {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.35);
          font-style: italic;
          line-height: 1.6;
          margin: 0;
        }

        .pp-mobile-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pp-mobile-heading {
          border-radius: 12px;
          border-left: 4px solid;
          padding: 1rem 1.125rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .pp-mobile-heading-name {
          font-family: 'Cinzel', var(--font-playfair, 'Playfair Display'), serif;
          font-size: 1.0625rem;
          font-weight: 700;
          color: #fff;
        }
        .pp-mobile-heading-era {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .pp-mobile-heading-note {
          margin-top: 0.375rem;
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.8125rem;
          font-style: italic;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        .pp-mobile-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 3px solid;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }
        .pp-mobile-card--absent {
          border-left: 1px dashed rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.08);
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
        }
        .pp-mobile-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pp-mobile-card-icon {
          font-size: 1rem;
          line-height: 1;
        }
        .pp-mobile-card-icon--absent { opacity: 0.3; }
        .pp-mobile-card-vision-label {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          filter: brightness(1.3);
        }
        .pp-mobile-card-absent-text {
          font-family: var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace);
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.22);
          font-style: italic;
        }
        .pp-mobile-card-name {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-weight: 700;
          font-size: 0.9375rem;
          color: #fff;
          line-height: 1.2;
        }
        .pp-mobile-card-quote {
          font-family: var(--font-playfair, 'Playfair Display', serif);
          font-size: 0.8125rem;
          font-style: italic;
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
        }
        .pp-mobile-card-desc {
          font-family: var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif);
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.58);
          line-height: 1.7;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 0.45rem;
        }

        /* ── Responsive show/hide ─────────────────────────────────────────── */
        .pp-show-desktop { display: none; }
        .pp-show-mobile  { display: block; }
        @media (min-width: 640px) {
          .pp-show-desktop { display: block; }
          .pp-show-mobile  { display: none; }
        }
      `}</style>

      <div className="pp-wrap">
        <div className="pp-show-desktop">
          <DesktopGrid selected={selected} onSelect={handleSelect} />
        </div>
        <div className="pp-show-mobile">
          <MobileView selected={selected} onSelect={handleSelect} />
        </div>
      </div>
    </>
  );
}
