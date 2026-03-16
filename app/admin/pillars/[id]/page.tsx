"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

interface FormState {
  num: string;
  label: string;
  title: string;
  paragraphs: string[];
  order: number;
}

const DEFAULT: FormState = {
  num: "",
  label: "",
  title: "",
  paragraphs: [""],
  order: 0,
};

export default function PillarEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const allPillars = useQuery(api.pillars.getAllAdmin);
  const addPillar = useMutation(api.pillars.add);
  const updatePillar = useMutation(api.pillars.update);
  const removePillar = useMutation(api.pillars.remove);

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  useEffect(() => {
    if (!isNew && allPillars) {
      const pillar = allPillars.find((p) => p._id === id);
      if (pillar) {
        setForm({
          num: pillar.num,
          label: pillar.label,
          title: pillar.title,
          paragraphs: pillar.paragraphs.length > 0 ? pillar.paragraphs : [""],
          order: pillar.order,
        });
      }
    }
  }, [allPillars, id, isNew]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  function updateParagraph(index: number, value: string) {
    setForm((prev) => {
      const updated = [...prev.paragraphs];
      updated[index] = value;
      return { ...prev, paragraphs: updated };
    });
    setIsDirty(true);
  }

  function addParagraph() {
    setForm((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
    setIsDirty(true);
  }

  function removeParagraph(index: number) {
    setForm((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const paragraphs = form.paragraphs.filter((p) => p.trim());
    setSaving(true);
    try {
      if (isNew) {
        await addPillar({ ...form, paragraphs });
        toast.success("Pillar created");
      } else {
        await updatePillar({ id: id as Id<"pillars">, ...form, paragraphs });
        toast.success("Pillar saved");
      }
      router.push("/admin/pillars");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removePillar({ id: id as Id<"pillars"> });
      toast.success("Pillar deleted");
      router.push("/admin/pillars");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/pillars" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Pillars
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
          <CardTitle className="text-base">{isNew ? "New Pillar" : "Edit Pillar"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-stone-300">Num</label>
              <input
                type="text"
                value={form.num}
                onChange={(e) => set("num", e.target.value)}
                placeholder="e.g. 01"
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-stone-300">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">Label</label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="Short label"
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-stone-300">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-300">Paragraphs</label>
            {form.paragraphs.map((para, index) => (
              <div key={index} className="flex gap-2 items-start">
                <textarea
                  value={para}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  rows={3}
                  className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-h-[80px] resize-y"
                />
                {form.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="mt-2 text-stone-500 hover:text-red-400 text-sm transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParagraph}
              className="border-stone-700 text-stone-300 hover:bg-stone-800"
            >
              + Add Paragraph
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
