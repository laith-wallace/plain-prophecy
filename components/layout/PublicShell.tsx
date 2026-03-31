"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import AppSidebar from "./AppSidebar";
import SearchDialog from "@/components/search/SearchDialog";
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";

function AppShellInner({ children }: { children: ReactNode }) {
  const { open, setOpen, isMobile, setOpenMobile } = useSidebar();

  const handleContentClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      <AppSidebar />
      <SidebarInset
        style={{ background: "#0c0a09", minHeight: "100dvh" }}
        onClick={handleContentClick}
      >
        {/* Mobile-only header bar with sidebar trigger */}
        <header
          className="flex md:hidden items-center h-12 px-4 sticky top-0 z-50"
          style={{
            background: "#0e0b09",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <SidebarTrigger
            style={{ color: "rgba(255,255,255,0.7)" }}
            onClick={(e) => e.stopPropagation()}
          />
        </header>
        {children}
      </SidebarInset>
    </>
  );
}

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isFullscreen = pathname === "/studies/map" || pathname === "/studies/timeline" || pathname === "/connections";

  const [searchOpen, setSearchOpen] = useState(false);
  const user = useQuery(api.users.viewer);

  useEffect(() => {
    function onOpenSearch() {
      setSearchOpen(true);
    }
    window.addEventListener("open-search", onOpenSearch);
    return () => window.removeEventListener("open-search", onOpenSearch);
  }, []);

  // Warm the search index in the background after mount so first ⌘K is instant
  useEffect(() => {
    const warm = () => import("@/lib/search").then((m) => m.getSearchIndex());
    if ("requestIdleCallback" in window) {
      requestIdleCallback(warm);
    } else {
      setTimeout(warm, 2000);
    }
  }, []);

  // Admin + fullscreen pages manage their own layout
  if (isAdmin || isFullscreen) return <>{children}</>;

  // Authenticated users get the app sidebar layout
  if (user) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "17rem",
            "--sidebar-width-icon": "3.5rem",
          } as React.CSSProperties
        }
      >
        <AppShellInner>{children}</AppShellInner>
      </SidebarProvider>
    );
  }

  // Guest users get the classic site nav + footer
  return (
    <>
      <SiteNav onSearchOpen={() => setSearchOpen(true)} />
      {/* pb-20 sm:pb-0 reserves space above the mobile bottom nav */}
      <div className="pb-20 sm:pb-0">
        {children}
      </div>
      <SiteFooter />
      <MobileBottomNav onSearchOpen={() => setSearchOpen(true)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
