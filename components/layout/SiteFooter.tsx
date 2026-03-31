import Link from "next/link";
import Image from "next/image";

const exploreLinks = [
  { href: "/studies", label: "Studies" },
  { href: "/connections", label: "Connections" },
  { href: "/compare", label: "Compare" },
  { href: "/evidence", label: "Evidence" },
  { href: "/doctrine", label: "Doctrine" },
  { href: "/prophet", label: "Prophet" },
  { href: "/blog", label: "Blog" },
  { href: "/games", label: "Games" },
];

const learnLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

const scriptureAnchors = [
  "Dan 8:14",
  "Dan 9:24–27",
  "Rev 14:6–12",
  "Rev 20",
  "Heb 8–9",
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderTop: "2px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Main footer content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand + mission */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/plain-prophecy-logo.svg"
              alt="Plain Prophecy"
              width={105}
              height={24}
              style={{ height: 24, width: "auto" }}
            />
          </Link>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans)",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
              maxWidth: 280,
            }}
          >
            A Christ-centred resource for understanding biblical prophecy.
            Grounded in the Reformation consensus — Scripture first, always.
          </p>
          {/* Scripture anchors */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem 0.75rem",
              marginTop: "0.25rem",
            }}
          >
            {scriptureAnchors.map((ref) => (
              <span
                key={ref}
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.05em",
                  color: "var(--sda-accent)",
                  opacity: 0.8,
                }}
              >
                {ref}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Explore */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "0.25rem",
            }}
          >
            Explore
          </span>
          {exploreLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-ibm-plex-sans)",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Col 3 — Learn */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "0.25rem",
            }}
          >
            Learn
          </span>
          {learnLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-ibm-plex-sans)",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              className="footer-link"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.25rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} Plain Prophecy · Biblical Prophecy Resource
        </span>
        <span
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em",
          }}
        >
          plainprophecy.com · Created by Laith Wallace |{" "}
          <a
            href="https://www.flowconverts.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            flowconverts.com
          </a>
        </span>
      </div>

      <style>{`
        .footer-link:hover { color: rgba(255,255,255,0.95) !important; }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
