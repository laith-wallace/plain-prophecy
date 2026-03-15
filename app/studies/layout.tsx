"use client";

import { usePathname } from "next/navigation";
import StudiesLayout from "@/components/studies/StudiesLayout";

import "../sidebar.css";
import "../studies-layout.css";

export default function StudiesShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/studies";
  return (
    <StudiesLayout
      defaultSidebarOpen={!isIndex}
      collapsibleMode={isIndex ? "offcanvas" : "icon"}
    >
      {children}
    </StudiesLayout>
  );
}
