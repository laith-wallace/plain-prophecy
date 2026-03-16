"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { generateSlug, isValidSlug } from "@/lib/slug";

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string;
  coverImage: string;
  body: string;
  published: boolean;
}

function timestampToDateInput(ts: number): string {
  const d = new Date(ts);
  return d.toISOString().slice(0, 10);
}

function dateInputToTimestamp(s: string): number {
  return new Date(s).getTime();
}

const DEFAULT: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  author: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  tags: "",
  coverImage: "",
  body: "",
  published: false,
};

export default function BlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const post = useQuery(
    api.blog.getByIdAdmin,
    !isNew ? { id: id as Id<"blogPosts"> } : "skip"
  );
  const addPost = useMutation(api.blog.add);
  const updatePost = useMutation(api.blog.update);
  const removePost = useMutation(api.blog.remove);

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: timestampToDateInput(post.publishedAt),
        tags: post.tags.join(", "),
        coverImage: post.coverImage ?? "",
        body: post.body,
        published: post.published,
      });
    }
  }, [post]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    if (!isValidSlug(form.slug)) {
      toast.error("Slug can only contain lowercase letters, numbers, and hyphens");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        author: form.author,
        publishedAt: dateInputToTimestamp(form.publishedAt),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        coverImage: form.coverImage.trim() || undefined,
        body: form.body,
        published: form.published,
      };
      if (isNew) {
        await addPost(payload);
        toast.success("Post created");
      } else {
        await updatePost({ id: id as Id<"blogPosts">, ...payload });
        toast.success("Post saved");
      }
      router.push("/admin/blog");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removePost({ id: id as Id<"blogPosts"> });
      toast.success("Post deleted");
      router.push("/admin/blog");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-2">
          {!isNew && (
            <DeleteConfirmDialog
              trigger={<Button variant="destructive" size="sm">Delete</Button>}
              onConfirm={handleDelete}
            />
          )}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <Card className="bg-stone-900 border-stone-800">
        <CardHeader>
          <CardTitle className="text-base">{isNew ? "New Blog Post" : "Edit Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              onBlur={() => {
                if (!form.slug) set("slug", generateSlug(form.title));
              }}
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">
              Slug <span className="text-stone-500 font-normal">(used in URL)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="my-post-title"
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => set("slug", generateSlug(form.title))}
                className="border-stone-700 text-stone-400 hover:bg-stone-800 shrink-0"
                title="Regenerate slug from title"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
            </div>
            {form.slug && (
              <p className="text-xs text-stone-500">
                plainprophecy.com/blog/<span className="text-stone-400">{form.slug}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-stone-300">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-stone-300">Published Date</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => set("publishedAt", e.target.value)}
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">
              Tags <span className="text-stone-500 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="daniel, prophecy, historicism"
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">
              Cover Image <span className="text-stone-500 font-normal">(optional URL)</span>
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://..."
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">
              Content <span className="text-stone-500 font-normal">(Markdown supported)</span>
            </label>
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              rows={20}
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-h-[400px] resize-y font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch
              checked={form.published}
              onCheckedChange={(v) => set("published", v)}
              id="published"
            />
            <label htmlFor="published" className="text-sm font-medium text-stone-300 cursor-pointer">
              Published
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
