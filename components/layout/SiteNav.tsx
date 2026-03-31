"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, User, ChevronDown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type DropdownItem = { href: string; label: string; description?: string };
type NavSection = { title?: string; items: DropdownItem[] };
type NavEntry = { label: string; href: string; sections?: NavSection[] };

const NAV: NavEntry[] = [
  {
    label: "Prophecies",
    href: "/studies",
    sections: [
      {
        title: "Daniel",
        items: [
          {
            href: "/studies",
            label: "Browse Daniel Studies",
            description: "Chapters 2, 7, 8–9, 12 — world empires, the little horn & the 70 weeks",
          },
        ],
      },
      {
        title: "Revelation",
        items: [
          {
            href: "/studies",
            label: "Browse Revelation Studies",
            description: "The 7 Churches, Seals, Trumpets, Three Angels & the Millennium",
          },
        ],
      },
    ],
  },
  {
    label: "Study",
    href: "/studies",
    sections: [
      {
        items: [
          { href: "/studies", label: "All Courses", description: "Structured lessons on Daniel & Revelation" },
          { href: "/compare", label: "Compare Frameworks", description: "Historicism vs. Futurism explained" },
          { href: "/evidence", label: "Evidence Today", description: "Historical & archaeological proof" },
          { href: "/doctrine", label: "Doctrine", description: "Core beliefs, plainly explained" },
          { href: "/prophet", label: "The Prophet", description: "Meet the biblical prophets" },
          { href: "/learn", label: "Learn", description: "Guides and deep dives" },
        ],
      },
    ],
  },
  {
    label: "Explore",
    href: "/studies/map",
    sections: [
      {
        items: [
          { href: "/studies/map", label: "Prophetic Map", description: "Visualise empires across time" },
          { href: "/studies/timeline", label: "Interactive Timeline", description: "Prophetic periods on a single axis" },
          { href: "/connections", label: "Connections", description: "Link prophecy themes together" },
          { href: "/studies/empire-map", label: "Empire Map", description: "World empires from Daniel 2" },
          { href: "/studies/parallels", label: "Parallels", description: "Daniel & Revelation mirrored" },
          { href: "/games", label: "Games & Quizzes", description: "Test your knowledge" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const EXPLORE_ROUTES = [
  "/studies/map",
  "/studies/timeline",
  "/connections",
  "/studies/empire-map",
  "/studies/parallels",
  "/games",
];

function isEntryActive(entry: NavEntry, pathname: string): boolean {
  if (!entry.sections) {
    return pathname === entry.href || (entry.href !== "/" && pathname.startsWith(entry.href));
  }
  // For Explore: only active on its specific routes
  if (entry.label === "Explore") {
    return EXPLORE_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"));
  }
  // For Study: active on its routes but not Explore routes
  if (entry.label === "Study") {
    if (EXPLORE_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"))) return false;
    return pathname.startsWith("/studies") || pathname.startsWith("/compare") ||
      pathname.startsWith("/evidence") || pathname.startsWith("/doctrine") ||
      pathname.startsWith("/prophet") || pathname.startsWith("/learn");
  }
  // For Prophecies: same as Study (both point at /studies)
  if (entry.label === "Prophecies") {
    if (EXPLORE_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"))) return false;
    return pathname.startsWith("/studies");
  }
  return false;
}

export default function SiteNav({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const user = useQuery(api.users.viewer);
  const firstName = user?.name?.split(" ")[0] || "";

  useEffect(() => { setOpenMenu(null); }, [pathname]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function openDropdown(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

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
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/plain-prophecy-logo.svg"
            alt="Plain Prophecy"
            width={70}
            height={16}
            priority
            style={{ height: 16, width: "auto" }}
          />
        </Link>

        {/* Desktop Nav */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}
        >
          {NAV.map((entry) => {
            const active = isEntryActive(entry, pathname);
            const isOpen = openMenu === entry.label;
            const isTwoCol = (entry.sections?.length ?? 0) > 1;

            if (!entry.sections) {
              return (
                <Link
                  key={entry.label}
                  href={entry.href}
                  prefetch
                  style={{
                    padding: "0.5rem 0.75rem",
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? "var(--sda-accent)" : "#ffffff",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  {entry.label}
                </Link>
              );
            }

            return (
              <div
                key={entry.label}
                style={{ position: "relative" }}
                onMouseEnter={() => openDropdown(entry.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  onClick={() => setOpenMenu(isOpen ? null : entry.label)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.5rem 0.75rem",
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active || isOpen ? "var(--sda-accent)" : "#ffffff",
                    transition: "color 0.15s",
                  }}
                >
                  {entry.label}
                  <ChevronDown
                    size={10}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    onMouseEnter={() => openDropdown(entry.label)}
                    onMouseLeave={scheduleClose}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: isTwoCol ? "50%" : "0",
                      transform: isTwoCol ? "translateX(-50%)" : "none",
                      background: "#1c1917",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "1rem",
                      display: "grid",
                      gridTemplateColumns: isTwoCol ? "repeat(2, 1fr)" : "1fr",
                      gap: isTwoCol ? "0.5rem 2rem" : "0.125rem",
                      minWidth: isTwoCol ? 460 : 280,
                      boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                      zIndex: 200,
                    }}
                  >
                    {entry.sections.map((section, si) => (
                      <div key={si}>
                        {section.title && (
                          <div
                            style={{
                              fontFamily: "var(--font-ibm-plex-mono)",
                              fontSize: "0.58rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--sda-accent)",
                              marginBottom: "0.5rem",
                              paddingBottom: "0.4rem",
                              borderBottom: "1px solid rgba(232,160,32,0.2)",
                            }}
                          >
                            {section.title}
                          </div>
                        )}
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            prefetch
                            role="menuitem"
                            onClick={() => setOpenMenu(null)}
                            className="nav-dropdown-item"
                            style={{
                              display: "block",
                              padding: "0.4rem 0.6rem",
                              borderRadius: 6,
                              textDecoration: "none",
                              transition: "background 0.15s",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-ibm-plex-mono)",
                                fontSize: "0.68rem",
                                letterSpacing: "0.05em",
                                color: "#ffffff",
                                display: "block",
                              }}
                            >
                              {item.label}
                            </span>
                            {item.description && (
                              <span
                                style={{
                                  fontSize: "0.6rem",
                                  color: "rgba(255,255,255,0.38)",
                                  display: "block",
                                  marginTop: "0.1rem",
                                }}
                              >
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              color: "rgba(255,255,255,0.55)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "4px 8px",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            <Search size={13} />
            <span
              className="search-hint"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              ⌘K
            </span>
          </button>

          <Link
            href={user ? "/profile" : "/login"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              marginLeft: "0.25rem",
              transition: "opacity 0.2s",
            }}
            className="profile-nav-item"
          >
            {user ? (
              <>
                <span
                  className="nav-user-name"
                  style={{
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-ibm-plex-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    opacity: 0.8,
                  }}
                >
                  {firstName}
                </span>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--sda-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-ibm-plex-mono)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    overflow: "hidden",
                  }}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      width={30}
                      height={30}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    user.name?.[0] || user.email?.[0] || "?"
                  )}
                </div>
              </>
            ) : (
              <div
                className="nav-avatar-placeholder"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.7)",
                  transition: "all 0.2s",
                }}
              >
                <User size={16} />
              </div>
            )}
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .search-hint { display: none !important; }
          .nav-user-name { display: none !important; }
        }
        .nav-dropdown-item:hover {
          background: rgba(255,255,255,0.05) !important;
        }
        .profile-nav-item:hover {
          opacity: 0.8;
        }
        .profile-nav-item:hover .nav-avatar-placeholder {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </nav>
  );
}
