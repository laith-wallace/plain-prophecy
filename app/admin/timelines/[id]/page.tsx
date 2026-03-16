"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

type TimelineType = "futurist" | "sda" | "preterist";
type BadgeType = "fulfilled" | "future" | "present" | "historical";

interface FormState {
  type: TimelineType;
  date: string;
  badge: BadgeType;
  title: string;
  desc: string;
  refs: string;
  order: number;
}

const DEFAULT: FormState = {
  type: "sda",
  date: "",
  badge: "historical",
  title: "",
  desc: "",
  refs: "",
  order: 0,
};

export default function TimelineEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const allEntries = useQuery(api.timelines.getAllAdmin);
  const addEntry = useMutation(api.timelines.add);
  const updateEntry = useMutation(api.timelines.update);
  const removeEntry = useMutation(api.timelines.remove);

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  useEffect(() => {
    if (!isNew && allEntries) {
      const entry = allEntries.find((e) => e._id === id);
      if (entry) {
        setForm({
          type: entry.type,
          date: entry.date,
          badge: entry.badge,
          title: entry.title,
          desc: entry.desc,
          refs: entry.refs,
          order: entry.order,
        });
      }
    }
  }, [allEntries, id, isNew]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await addEntry(form);
        toast.success("Entry created");
      } else {
        await updateEntry({ id: id as Id<"timelines">, ...form });
        toast.success("Entry saved");
      }
      router.push("/admin/timelines");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removeEntry({ id: id as Id<"timelines"> });
      toast.success("Entry deleted");
      router.push("/admin/timelines");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/timelines" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Timelines
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
          <CardTitle className="text-base">{isNew ? "New Timeline Entry" : "Edit Timeline Entry"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-stone-300">Type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v as TimelineType)}>
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectItem value="sda">SDA</SelectItem>
                  <SelectItem value="futurist">Futurist</SelectItem>
                  <SelectItem value="preterist">Preterist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-300">Badge</Label>
              <Select value={form.badge} onValueChange={(v) => set("badge", v as BadgeType)}>
                <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700 text-stone-100">
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="future">Future</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-stone-300">Date</Label>
              <Input
                type="text"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                placeholder="e.g. 538 BC or AD 1844"
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-300">Order</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
                className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Title</Label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Description</Label>
            <Textarea
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              rows={4}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Scripture References</Label>
            <Input
              type="text"
              value={form.refs}
              onChange={(e) => set("refs", e.target.value)}
              placeholder="e.g. Dan 7:25; Rev 13:5"
              className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
