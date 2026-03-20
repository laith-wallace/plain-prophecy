"use client";

import { usePathname } from "next/navigation";
import StudiesLayout from "@/components/studies/StudiesLayout";

import "../sidebar.css";
import "../studies-layout.css";
import "../study-template.css";

export default function StudiesShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/studies";
  const isParallels = pathname === "/studies/parallels";
  const isFullscreen =
    pathname === "/studies/map" ||
    pathname === "/studies/timeline" ||
    pathname === "/studies/empire-map";

  // Fullscreen pages — no sidebar
  if (isFullscreen) {
    return <>{children}</>;
  }

  return (
    <StudiesLayout
      defaultSidebarOpen={!isIndex && !isParallels}
      collapsibleMode={(isIndex || isParallels) ? "offcanvas" : "icon"}
    >
      {children}
    </StudiesLayout>
  );
}
