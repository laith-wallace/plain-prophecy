"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  Compass,
  MoreHorizontal,
  X,
  Newspaper,
  Scale,
  FlaskConical,
  BookMarked,
  Gamepad2,
  Info,
  Search,
  User,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const EXPLORE_ROUTES = [
  "/studies/map",
  "/studies/timeline",
  "/connections",
  "/studies/empire-map",
  "/studies/parallels",
  "/games",
];

const MORE_ITEMS = [
  { href: "/blog", label: "Blog", Icon: Newspaper },
  { href: "/compare", label: "Compare", Icon: Scale },
  { href: "/evidence", label: "Evidence", Icon: FlaskConical },
  { href: "/doctrine", label: "Doctrine", Icon: BookMarked },
  { href: "/games", label: "Games", Icon: Gamepad2 },
  { href: "/about", label: "About", Icon: Info },
];

export default function MobileBottomNav({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const user = useQuery(api.users.viewer);

  useEffect(() => { setSheetOpen(false); }, [pathname]);

  function isExploreRoute(p: string) {
    return EXPLORE_ROUTES.some(r => p === r || p.startsWith(r + "/"));
  }

  function isTabActive(label: string): boolean {
    if (label === "Home") return pathname === "/";
    if (label === "Explore") return isExploreRoute(pathname);
    if (label === "Study") {
      if (isExploreRoute(pathname)) return false;
      return (
        pathname.startsWith("/studies") ||
        pathname.startsWith("/compare") ||
        pathname.startsWith("/evidence") ||
        pathname.startsWith("/doctrine") ||
        pathname.startsWith("/prophet") ||
        pathname.startsWith("/learn")
      );
    }
    return false;
  }

  const tabs = [
    { label: "Home", href: "/", Icon: Home },
    { label: "Study", href: "/studies", Icon: BookOpen },
    { label: "Explore", href: "/studies/map", Icon: Compass },
  ];

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "stretch",
          zIndex: 200,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {tabs.map(({ label, href, Icon }) => {
          const active = isTabActive(label);
          return (
            <Link
              key={label}
              href={href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.2rem",
                padding: "0.5rem 0",
                textDecoration: "none",
                color: active ? "var(--sda-accent)" : "rgba(255,255,255,0.45)",
                transition: "color 0.15s",
                minHeight: 56,
              }}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* More tab */}
        <button
          onClick={() => setSheetOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.2rem",
            padding: "0.5rem 0",
            background: "none",
            border: "none",
            color: sheetOpen ? "var(--sda-accent)" : "rgba(255,255,255,0.45)",
            cursor: "pointer",
            transition: "color 0.15s",
            minHeight: 56,
          }}
        >
          <MoreHorizontal size={20} strokeWidth={1.75} />
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            More
          </span>
        </button>
      </nav>

      {/* Sheet Backdrop */}
      <div
        className="mobile-bottom-nav"
        onClick={() => setSheetOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(3px)",
          zIndex: 201,
          opacity: sheetOpen ? 1 : 0,
          pointerEvents: sheetOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
      />

      {/* More Sheet */}
      <div
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#1c1917",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px 16px 0 0",
          zIndex: 202,
          transform: sheetOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 72px)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "0.75rem 0 0.25rem" }}>
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.18)",
            }}
          />
        </div>

        {/* Sheet header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.25rem 1.25rem 0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            More
          </span>
          <button
            onClick={() => setSheetOpen(false)}
            aria-label="Close"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              borderRadius: 6,
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            padding: "0 1rem 1rem",
          }}
        >
          {MORE_ITEMS.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSheetOpen(false)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1rem 0.5rem",
                  background: active ? "rgba(232,160,32,0.08)" : "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  border: active
                    ? "1px solid rgba(232,160,32,0.2)"
                    : "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  color: active ? "var(--sda-accent)" : "rgba(255,255,255,0.8)",
                  transition: "background 0.15s",
                }}
              >
                <Icon size={22} strokeWidth={1.75} />
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Search tile */}
          <button
            onClick={() => { setSheetOpen(false); onSearchOpen?.(); }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "1rem 0.5rem",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
            }}
          >
            <Search size={22} strokeWidth={1.75} />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Search
            </span>
          </button>

          {/* Profile / Sign In tile */}
          <Link
            href={user ? "/profile" : "/login"}
            onClick={() => setSheetOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "1rem 0.5rem",
              background: user ? "rgba(232,160,32,0.08)" : "rgba(255,255,255,0.04)",
              borderRadius: 12,
              border: user
                ? "1px solid rgba(232,160,32,0.2)"
                : "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none",
              color: user ? "var(--sda-accent)" : "rgba(255,255,255,0.8)",
            }}
          >
            <User size={22} strokeWidth={1.75} />
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {user ? "Profile" : "Sign In"}
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        /* Show only on mobile */
        .mobile-bottom-nav {
          display: none !important;
        }
        @media (max-width: 640px) {
          nav.mobile-bottom-nav {
            display: flex !important;
          }
          div.mobile-bottom-nav {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
