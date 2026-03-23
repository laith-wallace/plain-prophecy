"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Map, Clock, GraduationCap, Scroll, FileText, LayoutDashboard, Layers, GitCompare } from "lucide-react";
import Link from "next/link";

const statCards = [
  { key: "evidence", label: "Evidence Sections", icon: BookOpen, href: "/admin/evidence" },
  { key: "doctrines", label: "Doctrines", icon: Map, href: "/admin/doctrines" },
  { key: "studyCourses", label: "Study Books", icon: GraduationCap, href: "/admin/studies" },
  { key: "studyLessons", label: "Study Lessons", icon: GraduationCap, href: "/admin/studies" },
  { key: "prophecies", label: "Prophecies", icon: Scroll, href: "/admin/prophecies" },
  { key: "timelines", label: "Timeline Entries", icon: Clock, href: "/admin/timelines" },
  { key: "blog", label: "Blog Posts", icon: FileText, href: "/admin/blog" },
  { key: "pillars", label: "Pillars", icon: Layers, href: "/admin/pillars" },
  { key: "compareHighlights", label: "Compare Highlights", icon: GitCompare, href: "/admin/compare" },
] as const;

export default function AdminDashboard() {
  const stats = useQuery(api.admin.dashboardStats);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-amber-500" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, href }) => {
          const stat = stats?.[key];
          const total = stat ? ("total" in stat ? stat.total : 0) : null;
          const published = stat && "published" in stat ? stat.published : null;

          return (
            <Link key={key} href={href}>
              <Card className="bg-stone-900 border-stone-800 hover:border-stone-700 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-medium text-stone-400 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-2xl font-bold text-stone-100">
                    {total === null ? "—" : total}
                  </p>
                  {published !== null && (
                    <p className="text-xs text-stone-500 mt-0.5">{published} published</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
