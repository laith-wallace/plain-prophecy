"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        <Table>
          <TableHeader className="[&_tr]:border-stone-800">
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Type</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Text</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Order</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-stone-800">
            {highlights === undefined && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</TableCell>
              </TableRow>
            )}
            {highlights !== undefined && filtered.length === 0 && highlights.length > 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <Button variant="link" size="sm" onClick={() => setSearch("")} className="text-amber-500 hover:text-amber-400 h-auto p-0">Clear</Button>
                </TableCell>
              </TableRow>
            )}
            {highlights?.length === 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No highlights yet.</TableCell>
              </TableRow>
            )}
            {filtered.map((highlight) => {
              const typeMeta = TYPE_BADGE[highlight.type] ?? { label: highlight.type, className: "" };
              return (
                <TableRow key={highlight._id} className="border-stone-800 hover:bg-stone-800/50">
                  <TableCell className="px-4 py-3 text-sm text-stone-200">
                    <Badge variant="outline" className={typeMeta.className}>{typeMeta.label}</Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-stone-200 max-w-xs truncate">{highlight.text}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-stone-200">{highlight.order}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-stone-200 text-right">
                    <Link
                      href={`/admin/compare/${highlight._id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
