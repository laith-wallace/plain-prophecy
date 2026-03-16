"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/components/ui/button";
import PublishedBadge from "@/components/admin/PublishedBadge";
import ListControls from "@/components/admin/ListControls";
import Link from "next/link";
import { cn } from "@/lib/utils";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogAdminPage() {
  const posts = useQuery(api.blog.getAllAdmin);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = (posts ?? [])
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
      <h1 className="text-lg font-semibold">Blog Posts</h1>

      <ListControls
        value={search}
        onValueChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortChange={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
        newItemHref="/admin/blog/new"
        newItemLabel="New Post"
        searchPlaceholder="Search posts…"
      />

      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Title</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Author</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Date</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left">Status</th>
              <th className="text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3 bg-stone-950 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {posts === undefined && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">Loading…</td>
              </tr>
            )}
            {posts !== undefined && filtered.length === 0 && posts.length > 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">
                  No results for &ldquo;{search}&rdquo;.{" "}
                  <button onClick={() => { setSearch(""); setStatusFilter("all"); }} className="text-amber-500 hover:text-amber-400 underline">Clear</button>
                </td>
              </tr>
            )}
            {posts?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="px-4 py-6 text-sm text-stone-500 text-center">No posts yet.</td>
              </tr>
            )}
            {filtered.map((post) => (
              <tr key={post._id} className="hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-200">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-stone-500">{post.slug}</div>
                </td>
                <td className="px-4 py-3 text-sm text-stone-200">{post.author}</td>
                <td className="px-4 py-3 text-sm text-stone-400">{formatDate(post.publishedAt)}</td>
                <td className="px-4 py-3 text-sm text-stone-200">
                  <PublishedBadge published={post.published} />
                </td>
                <td className="px-4 py-3 text-sm text-stone-200 text-right">
                  <Link href={`/admin/blog/${post._id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-stone-700 text-stone-300 hover:bg-stone-800")}>
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
