"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
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
  const user = useQuery(api.users.viewer);
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

  // Authenticated users: AppSidebar (in PublicShell) already provides the
  // studies subnav — skip StudiesLayout to avoid a double SidebarProvider
  if (user) {
    return <>{children}</>;
  }

  // Guest or loading: use the standalone studies sidebar layout
  return (
    <StudiesLayout
      defaultSidebarOpen={!isIndex && !isParallels}
      collapsibleMode={(isIndex || isParallels) ? "offcanvas" : "icon"}
    >
      {children}
    </StudiesLayout>
  );
}
