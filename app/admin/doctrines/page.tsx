"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PublishedBadge from "@/components/admin/PublishedBadge";
import ListControls from "@/components/admin/ListControls";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORY_BADGE: Record<string, { label: string; className: string }> = {
  rapture: { label: "Rapture", className: "bg-purple-900 text-purple-200 border-purple-800" },
  antichrist: { label: "Antichrist", className: "bg-red-900 text-red-200 border-red-800" },
  daniel: { label: "Daniel", className: "bg-amber-900 text-amber-200 border-amber-800" },
  revelation: { label: "Revelation", className: "bg-blue-900 text-blue-200 border-blue-800" },
};

export default function DoctrinesAdminPage() {
  const doctrines = useQuery(api.doctrines.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (doctrines ?? [])
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    .filter((d) =>
      statusFilter === "all" ? true :
      statusFilter === "published" ? d.published :
      !d.published
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 5;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Doctrines</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/doctrines/new"
        newItemLabel="New Doctrine"
        searchPlaceholder="Search doctrines…"
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Category</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Title</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Status</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Order</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {doctrines === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {doctrines !== undefined && filtered.length === 0 && doctrines.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {doctrines?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No doctrines yet.</td>
              </tr>
            )}
            {filtered.map((doc) => {
              const catMeta = CATEGORY_BADGE[doc.category] ?? { label: doc.category, className: "" };
              return (
                <tr key={doc._id} className="hover:bg-stone-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <Badge variant="outline" className={catMeta.className}>{catMeta.label}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <div>{doc.title}</div>
                    <div className="text-xs text-stone-500">{doc.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200">
                    <PublishedBadge published={doc.published} />
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-200">{doc.order}</td>
                  <td className="px-4 py-3 text-sm text-stone-200 text-right">
                    <Link href={`/admin/doctrines/${doc._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
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
