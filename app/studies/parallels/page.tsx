import type { Metadata } from "next";
import ProphecyParallels from "@/components/studies/ProphecyParallels";

export const metadata: Metadata = {
  title: "Prophecy Parallel Viewer — Plain Prophecy",
  description:
    "Daniel 2, 7, 8 and Revelation 13 describe the same world empires from four completely different angles. See the convergence in a single view.",
};

export default function ParallelsPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#08080F",
        color: "#fff",
      }}
    >
      {/* Page header */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding:
            "clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.75rem",
          }}
        >
          Four Visions · One History
        </p>

        <h1
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "1rem",
          }}
        >
          Prophecy Parallel Viewer
        </h1>

        <p
          style={{
            fontFamily: "var(--font-ibm-plex-sans, 'IBM Plex Sans', sans-serif)",
            fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "62ch",
            lineHeight: 1.75,
            marginBottom: "0.75rem",
          }}
        >
          Daniel 2, 7, 8, and Revelation 13 each describe the same arc of world
          empires — from Babylon to the eternal kingdom — using completely
          different symbols. Read them side by side and the convergence becomes
          impossible to dismiss.
        </p>

        <p
          style={{
            fontFamily: "var(--font-ibm-plex-mono, 'IBM Plex Mono', monospace)",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            color: "#C9A84C",
            opacity: 0.75,
          }}
        >
          ↓ Click any empire row to expand the full analysis
        </p>
      </section>

      <ProphecyParallels />
    </main>
  );
}
