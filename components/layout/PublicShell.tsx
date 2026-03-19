"use client";

import { usePathname } from "next/navigation";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { ReactNode } from "react";

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isFullscreen = pathname === "/studies/map" || pathname === "/studies/timeline";

  if (isAdmin || isFullscreen) return <>{children}</>;

  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
