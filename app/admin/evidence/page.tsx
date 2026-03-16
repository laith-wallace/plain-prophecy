"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        <Table>
          <TableHeader className="[&_tr]:border-stone-800">
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Num</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Title</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Status</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Order</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-stone-800">
            {sections === undefined && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</TableCell>
              </TableRow>
            )}
            {sections !== undefined && filtered.length === 0 && sections.length > 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <Button variant="link" size="sm" onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 h-auto p-0">Clear</Button>
                </TableCell>
              </TableRow>
            )}
            {sections?.length === 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No sections yet.</TableCell>
              </TableRow>
            )}
            {filtered.map((section) => (
              <TableRow key={section._id} className="border-stone-800 hover:bg-stone-800/50">
                <TableCell className="px-4 py-3 text-sm text-stone-400 font-mono">{section.num}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200">
                  <div>{section.title}</div>
                  <div className="text-xs text-stone-500">{section.label}</div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200">
                  <PublishedBadge published={section.published} />
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200">{section.order}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200 text-right">
                  <Link href={`/admin/evidence/${section._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
