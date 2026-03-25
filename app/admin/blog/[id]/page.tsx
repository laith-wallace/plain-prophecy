"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import BlogDetailsPanel, { BlogDetailsPanelFormState } from "@/components/admin/BlogDetailsPanel";
import { toast } from "sonner";
import Link from "next/link";
import { isValidSlug } from "@/lib/slug";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { PanelRight } from "lucide-react";
import dynamic from "next/dynamic";

// Load editor client-side only to avoid hydration mismatch
const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] animate-pulse bg-stone-900/40 rounded-lg" />
  ),
});

interface FormState extends BlogDetailsPanelFormState {
  title: string;
}

function timestampToDateInput(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function dateInputToTimestamp(s: string): number {
  return new Date(s).getTime();
}

const DEFAULT: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  author: "",
  authorBio: "",
  authorImage: "",
  authorTwitter: "",
  authorLinkedIn: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  readingTime: "",
  tags: "",
  coverImage: "",
  published: false,
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
};

type SaveStatus = "idle" | "saving" | "saved";

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
  const [bodyJson, setBodyJson] = useState<object | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [detailsOpen, setDetailsOpen] = useState(false);
  useUnsavedChanges(isDirty);

  // Autosave debounce ref
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        authorBio: post.authorBio ?? "",
        authorImage: post.authorImage ?? "",
        authorTwitter: post.authorTwitter ?? "",
        authorLinkedIn: post.authorLinkedIn ?? "",
        publishedAt: timestampToDateInput(post.publishedAt),
        readingTime: post.readingTime?.toString() ?? "",
        tags: post.tags.join(", "),
        coverImage: post.coverImage ?? "",
        published: post.published,
        metaTitle: post.metaTitle ?? "",
        metaDescription: post.metaDescription ?? "",
        ogImage: post.ogImage ?? "",
      });
      // Load bodyJson if present, otherwise leave null (empty editor)
      setBodyJson((post as { bodyJson?: object }).bodyJson ?? null);
    }
  }, [post]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  // Autosave: called 500ms after the last editor change (existing posts only)
  const autoSave = useCallback(
    async (json: object, plainText: string) => {
      if (isNew) return;
      setSaveStatus("saving");
      try {
        await updatePost({
          id: id as Id<"blogPosts">,
          slug: form.slug,
          title: form.title,
          excerpt: form.excerpt,
          author: form.author,
          authorBio: form.authorBio.trim() || undefined,
          authorImage: form.authorImage.trim() || undefined,
          authorTwitter: form.authorTwitter.trim() || undefined,
          authorLinkedIn: form.authorLinkedIn.trim() || undefined,
          publishedAt: dateInputToTimestamp(form.publishedAt),
          lastUpdated: Date.now(),
          readingTime: form.readingTime ? parseInt(form.readingTime) : undefined,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          coverImage: form.coverImage.trim() || undefined,
          body: plainText,
          bodyJson: json,
          published: form.published,
          metaTitle: form.metaTitle.trim() || undefined,
          metaDescription: form.metaDescription.trim() || undefined,
          ogImage: form.ogImage.trim() || undefined,
        });
        setIsDirty(false);
        setSaveStatus("saved");
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
        savedTimerRef.current = setTimeout(() => setSaveStatus("idle"), 1500);
      } catch {
        toast.error("Autosave failed");
        setSaveStatus("idle");
      }
    },
    [isNew, id, form, updatePost]
  );

  function onEditorChange(json: object, plainText: string) {
    setBodyJson(json);
    setIsDirty(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      autoSave(json, plainText);
    }, 500);
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

    // Cancel any pending autosave
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setSaveStatus("saving");
    try {
      const plainText = bodyJson ? extractPlainText(bodyJson) : form.title;

      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        author: form.author,
        authorBio: form.authorBio.trim() || undefined,
        authorImage: form.authorImage.trim() || undefined,
        authorTwitter: form.authorTwitter.trim() || undefined,
        authorLinkedIn: form.authorLinkedIn.trim() || undefined,
        publishedAt: dateInputToTimestamp(form.publishedAt),
        lastUpdated: Date.now(),
        readingTime: form.readingTime ? parseInt(form.readingTime) : undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        coverImage: form.coverImage.trim() || undefined,
        body: plainText,
        bodyJson: bodyJson ?? undefined,
        published: form.published,
        metaTitle: form.metaTitle.trim() || undefined,
        metaDescription: form.metaDescription.trim() || undefined,
        ogImage: form.ogImage.trim() || undefined,
      };

      if (isNew) {
        await addPost(payload);
        toast.success("Post created");
        router.push("/admin/blog");
      } else {
        await updatePost({ id: id as Id<"blogPosts">, ...payload });
        toast.success("Post saved");
        setIsDirty(false);
        setSaveStatus("saved");
        if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
        savedTimerRef.current = setTimeout(() => setSaveStatus("idle"), 1500);
      }
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
      setSaveStatus("idle");
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

  const saveLabel =
    saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved" : "Save";

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Editor action bar */}
      <div className="h-11 shrink-0 flex items-center gap-2 px-4 border-b border-stone-800 bg-stone-950">
        <Link
          href="/admin/blog"
          className="text-xs text-stone-500 hover:text-stone-300 transition-colors mr-1 flex items-center gap-1"
        >
          ← Blog
        </Link>

        <div className="flex-1" />

        {!isNew && form.slug && form.published && (
          <Link
            href={`/blog/${form.slug}`}
            target="_blank"
            className="text-xs text-stone-500 hover:text-amber-400 transition-colors"
          >
            View live ↗
          </Link>
        )}

        {!isNew && (
          <DeleteConfirmDialog
            trigger={
              <Button variant="destructive" size="sm" className="h-7 text-xs px-2.5">
                Delete
              </Button>
            }
            onConfirm={handleDelete}
          />
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setDetailsOpen((prev) => !prev)}
          className={`h-7 text-xs px-2.5 border-stone-700 transition-colors ${
            detailsOpen
              ? "bg-amber-600/10 border-amber-600/50 text-amber-400"
              : "text-stone-400 hover:bg-stone-800 hover:text-stone-200"
          }`}
          title="Post details"
        >
          <PanelRight className="w-3.5 h-3.5 mr-1" />
          Details
        </Button>

        <Button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          size="sm"
          className={`h-7 text-xs px-3 transition-colors ${
            saveStatus === "saved"
              ? "bg-green-700 hover:bg-green-700 text-white"
              : "bg-amber-600 hover:bg-amber-700 text-white"
          }`}
        >
          {saveLabel}
        </Button>
      </div>

      {/* Editor canvas */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-5 sm:px-20 pt-8 pb-4">
          {/* Title */}
          <input
            type="text"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Post title…"
            className="w-full text-3xl sm:text-4xl font-bold bg-transparent text-stone-100 placeholder:text-stone-700 outline-none border-none mb-6 leading-tight"
          />
        </div>

        {/* Tiptap editor */}
        <div className="max-w-[720px] mx-auto px-5 sm:px-20 pb-32">
          <RichTextEditor
            content={bodyJson}
            onChange={(json) => {
              const plainText = extractPlainText(json);
              onEditorChange(json, plainText);
            }}
            placeholder="Start writing, or press / for commands…"
          />
        </div>
      </div>

      {/* Details panel */}
      {detailsOpen && (
        <BlogDetailsPanel
          form={form}
          set={set}
          onClose={() => setDetailsOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Plain text extraction from Tiptap JSON ───────────────────────────────

type TiptapNode = {
  type?: string;
  text?: string;
  content?: TiptapNode[];
};

function extractPlainText(doc: object): string {
  const lines: string[] = [];

  function walk(node: TiptapNode) {
    if (node.text) {
      lines.push(node.text);
    }
    if (node.content) {
      const isBlock = node.type && ["paragraph", "heading", "blockquote", "codeBlock", "listItem"].includes(node.type);
      node.content.forEach((child, i) => {
        walk(child);
        if (isBlock && i < node.content!.length - 1) {
          lines.push(" ");
        }
      });
      if (isBlock) lines.push("\n");
    }
  }

  walk(doc as TiptapNode);
  return lines.join("").trim();
}
