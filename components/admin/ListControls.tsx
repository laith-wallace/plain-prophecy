"use client";

import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListControlsProps {
  value: string;
  onValueChange: (v: string) => void;
  statusFilter: "all" | "published" | "draft";
  onStatusChange: (v: "all" | "published" | "draft") => void;
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
  newItemHref: string;
  newItemLabel: string;
  searchPlaceholder?: string;
  showStatusFilter?: boolean;
}

export default function ListControls({
  value,
  onValueChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange,
  newItemHref,
  newItemLabel,
  searchPlaceholder = "Search…",
  showStatusFilter = true,
}: ListControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-500"
        />

        {showStatusFilter && (
          <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as "all" | "published" | "draft")}>
            <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100 w-32 text-sm focus:ring-amber-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-stone-900 border-stone-700 text-stone-100">
              <SelectItem value="all" className="focus:bg-stone-800">All</SelectItem>
              <SelectItem value="published" className="focus:bg-stone-800">Published</SelectItem>
              <SelectItem value="draft" className="focus:bg-stone-800">Draft</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onSortChange}
          className="border-stone-700 text-stone-400 hover:bg-stone-800 shrink-0"
          title={sortOrder === "asc" ? "A→Z (click for Z→A)" : "Z→A (click for A→Z)"}
        >
          {sortOrder === "asc"
            ? <ArrowUpAZ className="w-4 h-4" />
            : <ArrowDownAZ className="w-4 h-4" />
          }
        </Button>
      </div>

      <Link href={newItemHref} className={cn(buttonVariants(), "shrink-0")}>
        {newItemLabel}
      </Link>
    </div>
  );
}
