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

export default function PropheciesAdminPage() {
  const prophecies = useQuery(api.prophecies.getAll);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (prophecies ?? [])
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      statusFilter === "all" ? true :
      statusFilter === "published" ? p.published :
      !p.published
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 5;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Prophecies</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/prophecies/new"
        newItemLabel="New Prophecy"
        searchPlaceholder="Search prophecies…"
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="[&_tr]:border-stone-800">
            <TableRow className="border-stone-800 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">#</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Symbol</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Title</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950">Status</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-stone-800">
            {prophecies === undefined && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</TableCell>
              </TableRow>
            )}
            {prophecies !== undefined && filtered.length === 0 && prophecies.length > 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <Button variant="link" size="sm" onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 h-auto p-0">Clear</Button>
                </TableCell>
              </TableRow>
            )}
            {prophecies?.length === 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No prophecies found.</TableCell>
              </TableRow>
            )}
            {filtered.map((p) => (
              <TableRow key={p._id} className="border-stone-800 hover:bg-stone-800/50">
                <TableCell className="px-4 py-3 text-sm text-stone-400">{p.number}</TableCell>
                <TableCell className="px-4 py-3 text-lg">{p.symbol}</TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200">
                  <div>{p.title}</div>
                  <div className="text-xs text-stone-500">{p.idStr}</div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200">
                  <PublishedBadge published={p.published} />
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-200 text-right">
                  <Link href={`/admin/prophecies/${p._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
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
