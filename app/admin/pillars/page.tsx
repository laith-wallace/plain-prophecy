"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/components/ui/button";
import ListControls from "@/components/admin/ListControls";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PillarsAdminPage() {
  const pillars = useQuery(api.pillars.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (pillars ?? [])
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 5;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Pillars</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/pillars/new"
        newItemLabel="New Pillar"
        searchPlaceholder="Search pillars…"
        showStatusFilter={false}
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Num</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Title</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Label</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Order</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {pillars === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {pillars !== undefined && filtered.length === 0 && pillars.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => setSearch("")} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {pillars?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No pillars yet.</td>
              </tr>
            )}
            {filtered.map((pillar) => (
              <tr key={pillar._id} className="hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-400 font-mono">{pillar.num}</td>
                <td className="px-4 py-3 text-sm text-stone-200">{pillar.title}</td>
                <td className="px-4 py-3 text-sm text-stone-400">{pillar.label}</td>
                <td className="px-4 py-3 text-sm text-stone-200">{pillar.order}</td>
                <td className="px-4 py-3 text-sm text-stone-200 text-right">
                  <Link
                    href={`/admin/pillars/${pillar._id}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}
                  >
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
