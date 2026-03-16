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

type HighlightType = "futuristWeakness" | "sdaStrength";

interface FormState {
  type: HighlightType;
  text: string;
  order: number;
}

const DEFAULT: FormState = {
  type: "sdaStrength",
  text: "",
  order: 0,
};

export default function CompareHighlightEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const allHighlights = useQuery(api.compareHighlights.getAllAdmin);
  const addHighlight = useMutation(api.compareHighlights.add);
  const updateHighlight = useMutation(api.compareHighlights.update);
  const removeHighlight = useMutation(api.compareHighlights.remove);

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && allHighlights) {
      const highlight = allHighlights.find((h) => h._id === id);
      if (highlight) {
        setForm({
          type: highlight.type,
          text: highlight.text,
          order: highlight.order,
        });
      }
    }
  }, [allHighlights, id, isNew]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.text.trim()) {
      toast.error("Text is required");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await addHighlight(form);
        toast.success("Highlight created");
      } else {
        await updateHighlight({ id: id as Id<"compareHighlights">, ...form });
        toast.success("Highlight saved");
      }
      router.push("/admin/compare");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removeHighlight({ id: id as Id<"compareHighlights"> });
      toast.success("Highlight deleted");
      router.push("/admin/compare");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/compare" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Compare
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
          <CardTitle className="text-base">{isNew ? "New Compare Highlight" : "Edit Compare Highlight"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-stone-300">Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as HighlightType)}
                className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <option value="sdaStrength">SDA Strength</option>
                <option value="futuristWeakness">Futurist Weakness</option>
              </select>
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
            <label className="text-sm font-medium text-stone-300">Text</label>
            <textarea
              value={form.text}
              onChange={(e) => set("text", e.target.value)}
              rows={4}
              className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
