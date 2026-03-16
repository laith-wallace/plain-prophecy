"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PublishedBadge from "@/components/admin/PublishedBadge";
import ListControls from "@/components/admin/ListControls";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminStudiesPage() {
  const courses = useQuery(api.studyCourses.getAllAdmin);
  const removeCourse = useMutation(api.studyCourses.remove);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (courses ?? [])
    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    .filter((c) =>
      statusFilter === "all" ? true :
      statusFilter === "published" ? c.published :
      !c.published
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const colSpan = 5;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Studies</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/studies/new"
        newItemLabel="New Book"
        searchPlaceholder="Search books…"
      />

      <div className="rounded-lg border border-stone-800 overflow-hidden">
        <Table>
          <TableHeader className="[&_tr]:border-stone-800">
            <TableRow className="bg-stone-950 border-stone-800 hover:bg-transparent">
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Book</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Slug</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Status</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Order</TableHead>
              <TableHead className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-stone-800">
            {courses === undefined && (
              <TableRow><TableCell colSpan={colSpan} className="px-4 py-8 text-center text-sm text-stone-500">Loading…</TableCell></TableRow>
            )}
            {courses !== undefined && filtered.length === 0 && courses.length > 0 && (
              <TableRow>
                <TableCell colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <Button variant="link" size="sm" onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 h-auto p-0">Clear</Button>
                </TableCell>
              </TableRow>
            )}
            {courses?.length === 0 && (
              <TableRow><TableCell colSpan={colSpan} className="px-4 py-8 text-center text-sm text-stone-500">No books yet.</TableCell></TableRow>
            )}
            {filtered.map((course) => (
              <TableRow key={course._id} className="bg-stone-900 border-stone-800 hover:bg-stone-800/50">
                <TableCell className="px-4 py-3 text-sm text-stone-200">
                  {course.icon && <span className="mr-2">{course.icon}</span>}
                  {course.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-400 font-mono">{course.slug}</TableCell>
                <TableCell className="px-4 py-3"><PublishedBadge published={course.published} /></TableCell>
                <TableCell className="px-4 py-3 text-sm text-stone-400">{course.order}</TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/studies/${course._id}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </Link>
                    <DeleteConfirmDialog
                      trigger={
                        <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-300 hover:bg-transparent">Delete</Button>
                      }
                      title="Delete this book?"
                      description="This will also delete all lessons in this book. This cannot be undone."
                      onConfirm={async () => {
                        await removeCourse({ id: course._id });
                        toast.success("Book deleted");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
