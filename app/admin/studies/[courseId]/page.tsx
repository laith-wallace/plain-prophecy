"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PublishedBadge from "@/components/admin/PublishedBadge";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const isNew = courseId === "new";

  const course = useQuery(
    api.studyCourses.getByIdAdmin,
    isNew ? "skip" : { id: courseId as Id<"studyCourses"> }
  );
  const lessons = useQuery(
    api.studyLessons.getAllByCourseAdmin,
    isNew ? "skip" : { courseId: courseId as Id<"studyCourses"> }
  );

  const addCourse = useMutation(api.studyCourses.add);
  const updateCourse = useMutation(api.studyCourses.update);
  const removeLesson = useMutation(api.studyLessons.remove);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState(0);
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setSlug(course.slug);
      setDescription(course.description);
      setIcon(course.icon ?? "");
      setOrder(course.order);
      setPublished(course.published);
    }
  }, [course]);

  // Auto-derive slug from title on new
  useEffect(() => {
    if (isNew) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title, isNew]);

  async function handleSave() {
    setSaving(true);
    try {
      const data = { slug, title, description, order, published, icon: icon || undefined };
      if (isNew) {
        const id = await addCourse(data);
        toast.success("Book created");
        router.push(`/admin/studies/${id}`);
      } else {
        await updateCourse({ id: courseId as Id<"studyCourses">, ...data });
        toast.success("Saved");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/studies" className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-200">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Studies
        </Link>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Book"}
        </Button>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-300">{isNew ? "New Book" : "Edit Book"}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-stone-300">Title</Label>
            <input
              value={title}
              onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="Daniel"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-stone-300">Icon (emoji)</Label>
            <input
              value={icon}
              onChange={(e) => { setIcon(e.target.value); setIsDirty(true); }}
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="📘"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-stone-300">Slug (URL identifier)</Label>
          <input
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setIsDirty(true); }}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="daniel"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-stone-300">Description</Label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); setIsDirty(true); }}
            rows={2}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600"
            placeholder="Short description shown on the studies index page"
          />
        </div>

        <div className="flex items-center gap-8">
          <div className="space-y-1">
            <Label className="text-stone-300">Order</Label>
            <input
              type="number"
              value={order}
              onChange={(e) => { setOrder(Number(e.target.value)); setIsDirty(true); }}
              className="w-24 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
          <div className="flex items-center gap-2 pt-5">
            <Switch checked={published} onCheckedChange={(v) => { setPublished(v); setIsDirty(true); }} />
            <Label className="text-stone-300">Published</Label>
          </div>
        </div>
      </div>

      {!isNew && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-300">Lessons</h2>
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/studies/${courseId}/lessons/new`)}
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> New Lesson
            </Button>
          </div>

          <div className="rounded-lg border border-stone-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-950">
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Lesson</th>
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Slug</th>
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Order</th>
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wide px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {lessons === undefined && (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-stone-500">Loading…</td></tr>
                )}
                {lessons?.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-6 text-center text-sm text-stone-500">No lessons yet.</td></tr>
                )}
                {lessons?.map((lesson) => (
                  <tr key={lesson._id} className="bg-stone-900 hover:bg-stone-800/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-stone-200">{lesson.title}</td>
                    <td className="px-4 py-3 text-sm text-stone-400 font-mono">{lesson.slug}</td>
                    <td className="px-4 py-3"><PublishedBadge published={lesson.published} /></td>
                    <td className="px-4 py-3 text-sm text-stone-400">{lesson.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/studies/${courseId}/lessons/${lesson._id}`}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </Link>
                        <DeleteConfirmDialog
                          trigger={<button className="text-xs text-red-400 hover:text-red-300">Delete</button>}
                          onConfirm={async () => {
                            await removeLesson({ id: lesson._id });
                            toast.success("Lesson deleted");
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
      )}
    </div>
  );
}
