"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, User } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/studies", label: "Studies" },
  { href: "/studies/map", label: "Map" },
  { href: "/studies/timeline", label: "Timeline" },
  { href: "/compare", label: "Compare" },
  { href: "/learn", label: "Learn" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
];

export default function SiteNav({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const user = useQuery(api.users.viewer);

  const desktopLinks = links.filter(l => l.label !== "Profile");
  const firstName = user?.name?.split(' ')[0] || '';

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

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {desktopLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch={true}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "var(--sda-accent)"
                    : "#ffffff",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
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
              transition: "opacity 0.2s"
            }}
            className="profile-nav-item"
          >
            {user ? (
              <>
                <span style={{ 
                  color: "#fff", 
                  fontSize: "0.7rem", 
                  fontFamily: "var(--font-ibm-plex-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  opacity: 0.8
                }} 
                className="nav-user-name">
                  {firstName}
                </span>
                <div style={{
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
                  overflow: "hidden"
                }}>
                  {user.image ? (
                    <Image 
                      src={user.image} 
                      alt={user.name || "Profile"} 
                      width={30} 
                      height={30} 
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    user.name?.[0] || user.email?.[0] || '?'
                  )}
                </div>
              </>
            ) : (
              <div style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.7)",
                transition: "all 0.2s"
              }}
              className="nav-avatar-placeholder"
              >
                <User size={16} />
              </div>
            )}
          </Link>

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
              prefetch={true}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "var(--sda-accent)"
                    : "#ffffff",
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
          .search-hint { display: none !important; }
          .profile-nav-item { display: none !important; }
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
