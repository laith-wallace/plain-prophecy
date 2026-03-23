"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Clock,
  GraduationCap,
  Scroll,
  FileText,
  Layers,
  GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Evidence Today", href: "/admin/evidence", icon: BookOpen },
  { label: "Doctrines", href: "/admin/doctrines", icon: Map },
  { label: "Pillars", href: "/admin/pillars", icon: Layers },
  { label: "Compare", href: "/admin/compare", icon: GitCompare },
  { label: "Timelines", href: "/admin/timelines", icon: Clock },
  { label: "Studies", href: "/admin/studies", icon: GraduationCap },
  { label: "Prophecies", href: "/admin/prophecies", icon: Scroll },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

export const AdminSidebar = memo(function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full bg-stone-950 border-r border-stone-800">
      <div className="px-4 py-5 border-b border-stone-800">
        <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Plain Prophecy</p>
        <p className="text-xs text-stone-500 mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-amber-600/15 text-amber-400"
                  : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
});

export default AdminSidebar;
