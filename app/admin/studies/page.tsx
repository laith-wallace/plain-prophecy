"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Pencil } from "lucide-react";
import PublishedBadge from "@/components/admin/PublishedBadge";
import ListControls from "@/components/admin/ListControls";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";

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
        <table className="w-full">
          <thead>
            <tr className="bg-stone-950">
              <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Book</th>
              <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Slug</th>
              <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Order</th>
              <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {courses === undefined && (
              <tr><td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-stone-500">Loading…</td></tr>
            )}
            {courses !== undefined && filtered.length === 0 && courses.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {courses?.length === 0 && (
              <tr><td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-stone-500">No books yet.</td></tr>
            )}
            {filtered.map((course) => (
              <tr key={course._id} className="bg-stone-900 hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-200">
                  {course.icon && <span className="mr-2">{course.icon}</span>}
                  {course.title}
                </td>
                <td className="px-4 py-3 text-sm text-stone-400 font-mono">{course.slug}</td>
                <td className="px-4 py-3"><PublishedBadge published={course.published} /></td>
                <td className="px-4 py-3 text-sm text-stone-400">{course.order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/studies/${course._id}`}
                      className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </Link>
                    <DeleteConfirmDialog
                      trigger={
                        <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                      }
                      title="Delete this book?"
                      description="This will also delete all lessons in this book. This cannot be undone."
                      onConfirm={async () => {
                        await removeCourse({ id: course._id });
                        toast.success("Book deleted");
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
