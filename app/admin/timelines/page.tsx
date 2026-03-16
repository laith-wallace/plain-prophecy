"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ListControls from "@/components/admin/ListControls";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TYPE_BADGE: Record<string, { label: string; className: string }> = {
  futurist: { label: "Futurist", className: "bg-blue-900 text-blue-200 border-blue-800" },
  preterist: { label: "Preterist", className: "bg-orange-900 text-orange-200 border-orange-800" },
  sda: { label: "SDA", className: "bg-amber-900 text-amber-200 border-amber-800" },
};

const ENTRY_BADGE_BADGE: Record<string, { label: string; className: string }> = {
  fulfilled: { label: "Fulfilled", className: "bg-emerald-900 text-emerald-200 border-emerald-800" },
  future: { label: "Future", className: "bg-purple-900 text-purple-200 border-purple-800" },
  present: { label: "Present", className: "bg-sky-900 text-sky-200 border-sky-800" },
  historical: { label: "Historical", className: "bg-stone-800 text-stone-300 border-stone-700" },
};

export default function TimelinesAdminPage() {
  const entries = useQuery(api.timelines.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (entries ?? [])
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 6;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Timeline Entries</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/timelines/new"
        newItemLabel="New Entry"
        searchPlaceholder="Search entries…"
        showStatusFilter={false}
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Type</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Date</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Title</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Badge</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Order</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {entries === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {entries !== undefined && filtered.length === 0 && entries.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => setSearch("")} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {entries?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No entries yet.</td>
              </tr>
            )}
            {filtered.map((entry) => {
              const typeMeta = TYPE_BADGE[entry.type] ?? { label: entry.type, className: "" };
              const badgeMeta = ENTRY_BADGE_BADGE[entry.badge] ?? { label: entry.badge, className: "" };
              return (
                <tr key={entry._id} className="hover:bg-stone-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <Badge variant="outline" className={typeMeta.className}>{typeMeta.label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200">{entry.date}</td>
                  <td className="px-4 py-3 text-sm text-stone-200 max-w-xs truncate">{entry.title}</td>
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <Badge variant="outline" className={badgeMeta.className}>{badgeMeta.label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200">{entry.order}</td>
                  <td className="px-4 py-3 text-sm text-stone-200 text-right">
                    <Link href={`/admin/timelines/${entry._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
