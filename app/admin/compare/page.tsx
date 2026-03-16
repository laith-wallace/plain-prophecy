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
  futuristWeakness: { label: "Futurist Weakness", className: "bg-blue-900 text-blue-200 border-blue-800" },
  preteristWeakness: { label: "Preterist Weakness", className: "bg-purple-900 text-purple-200 border-purple-800" },
  sdaStrength: { label: "SDA Strength", className: "bg-amber-900 text-amber-200 border-amber-800" },
};

export default function CompareAdminPage() {
  const highlights = useQuery(api.compareHighlights.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // compareHighlights has no title — search on text instead
  const filtered = (highlights ?? [])
    .filter((h) => h.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text)
    );

  const colSpan = 4;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Compare Highlights</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/compare/new"
        newItemLabel="New Highlight"
        searchPlaceholder="Search highlights…"
        showStatusFilter={false}
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Type</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Text</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Order</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {highlights === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {highlights !== undefined && filtered.length === 0 && highlights.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => setSearch("")} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {highlights?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No highlights yet.</td>
              </tr>
            )}
            {filtered.map((highlight) => {
              const typeMeta = TYPE_BADGE[highlight.type] ?? { label: highlight.type, className: "" };
              return (
                <tr key={highlight._id} className="hover:bg-stone-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <Badge variant="outline" className={typeMeta.className}>{typeMeta.label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200 max-w-xs truncate">{highlight.text}</td>
                  <td className="px-4 py-3 text-sm text-stone-200">{highlight.order}</td>
                  <td className="px-4 py-3 text-sm text-stone-200 text-right">
                    <Link
                      href={`/admin/compare/${highlight._id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}
                    >
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
