"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import SearchDialog from "@/components/search/SearchDialog";
import { ReactNode } from "react";

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isFullscreen = pathname === "/studies/map" || pathname === "/studies/timeline";

  const [searchOpen, setSearchOpen] = useState(false);

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

  if (isAdmin || isFullscreen) return <>{children}</>;

  return (
    <>
      <SiteNav onSearchOpen={() => setSearchOpen(true)} />
      {children}
      <SiteFooter />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
