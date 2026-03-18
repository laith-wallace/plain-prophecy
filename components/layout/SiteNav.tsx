"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/studies", label: "Studies" },
  { href: "/studies/map", label: "Map" },
  { href: "/compare", label: "Compare" },
  { href: "/learn", label: "Learn" },
  { href: "/prophet", label: "Prophet" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderBottom: "2px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "1.1rem",
            color: "var(--paper)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Plain<span style={{ color: "var(--sda-accent)" }}>Prophecy</span>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "var(--sda-accent)"
                    : "rgba(255,255,255,0.65)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--paper)",
            cursor: "pointer",
            fontSize: "1.3rem",
            padding: "0.25rem",
            display: "none",
          }}
          className="hamburger"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "var(--ink)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "var(--sda-accent)"
                    : "rgba(255,255,255,0.75)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
