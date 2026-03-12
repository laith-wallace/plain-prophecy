"use client";

import { usePathname } from "next/navigation";
import StudiesLayout from "@/components/studies/StudiesLayout";

export default function StudiesShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Index page: sidebar collapsed by default. Lesson pages: open.
  const isIndex = pathname === "/studies";
  return (
    <StudiesLayout defaultSidebarOpen={!isIndex}>{children}</StudiesLayout>
  );
}
