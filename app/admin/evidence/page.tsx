"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/components/ui/button";
import PublishedBadge from "@/components/admin/PublishedBadge";
import ListControls from "@/components/admin/ListControls";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EvidenceAdminPage() {
  const sections = useQuery(api.evidence.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (sections ?? [])
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .filter((s) =>
      statusFilter === "all" ? true :
      statusFilter === "published" ? s.published :
      !s.published
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 5;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Evidence Sections</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/evidence/new"
        newItemLabel="New Section"
        searchPlaceholder="Search sections…"
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Num</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Title</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Status</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Order</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {sections === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {sections !== undefined && filtered.length === 0 && sections.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {sections?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No sections yet.</td>
              </tr>
            )}
            {filtered.map((section) => (
              <tr key={section._id} className="hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-400 font-mono">{section.num}</td>
                <td className="px-4 py-3 text-sm text-stone-200">
                  <div>{section.title}</div>
                  <div className="text-xs text-stone-500">{section.label}</div>
                </td>
                <td className="px-4 py-3 text-sm text-stone-200">
                  <PublishedBadge published={section.published} />
                </td>
                <td className="px-4 py-3 text-sm text-stone-200">{section.order}</td>
                <td className="px-4 py-3 text-sm text-stone-200 text-right">
                  <Link href={`/admin/evidence/${section._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
