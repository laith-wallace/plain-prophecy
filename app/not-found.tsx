import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem 2rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: 0.4,
          marginBottom: "1.5rem",
        }}
      >
        404 — Page Not Found
      </div>

      <h1
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "1.25rem",
          maxWidth: 600,
        }}
      >
        This page is sealed.
      </h1>

      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "var(--neutral)",
          maxWidth: 480,
          marginBottom: "2.5rem",
        }}
      >
        &ldquo;But thou, O Daniel, shut up the words, and seal the book.&rdquo;
        <br />
        <span
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.55,
            display: "block",
            marginTop: "0.5rem",
          }}
        >
          Daniel 12:4
        </span>
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.8rem 1.75rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Return Home →
        </Link>
        <Link
          href="/compare"
          style={{
            display: "inline-block",
            border: "2px solid var(--ink)",
            color: "var(--ink)",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.8rem 1.75rem",
            textDecoration: "none",
          }}
        >
          Compare Frameworks →
        </Link>
      </div>
    </main>
  );
}
