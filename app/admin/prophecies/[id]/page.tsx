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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

interface FormState {
  number: number;
  idStr: string;
  title: string;
  subtitle: string;
  symbol: string;
  scripture: string;
  connections: string;
  revealWhat: string;
  revealHistory: string;
  revealChrist: string;
  published: boolean;
}

const DEFAULT: FormState = {
  number: 1,
  idStr: "",
  title: "",
  subtitle: "",
  symbol: "",
  scripture: "",
  connections: "",
  revealWhat: "",
  revealHistory: "",
  revealChrist: "",
  published: false,
};

export default function ProphecyEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const allProphecies = useQuery(api.prophecies.getAll);
  const updateProphecy = useMutation(api.prophecies.update);
  const removeProphecy = useMutation(api.prophecies.remove);

  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  useUnsavedChanges(isDirty);

  useEffect(() => {
    if (allProphecies) {
      const p = allProphecies.find((p) => p._id === id);
      if (p) {
        setForm({
          number: p.number,
          idStr: p.idStr,
          title: p.title,
          subtitle: p.subtitle,
          symbol: p.symbol,
          scripture: p.scripture,
          connections: p.connections.join("\n"),
          revealWhat: p.reveal.what,
          revealHistory: p.reveal.history,
          revealChrist: p.reveal.christ,
          published: p.published,
        });
      }
    }
  }, [allProphecies, id]);

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
      await updateProphecy({
        id: id as Id<"prophecies">,
        number: form.number,
        idStr: form.idStr,
        title: form.title,
        subtitle: form.subtitle,
        symbol: form.symbol,
        scripture: form.scripture,
        connections: form.connections
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        reveal: {
          what: form.revealWhat,
          history: form.revealHistory,
          christ: form.revealChrist,
        },
        published: form.published,
      });
      toast.success("Prophecy saved");
      router.push("/admin/prophecies");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await removeProphecy({ id: id as Id<"prophecies"> });
      toast.success("Prophecy deleted");
      router.push("/admin/prophecies");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/prophecies" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Prophecies
        </Link>
        <div className="flex items-center gap-2">
          <DeleteConfirmDialog
            trigger={<Button variant="destructive" size="sm">Delete</Button>}
            onConfirm={handleDelete}
          />
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
          <CardTitle className="text-base">Edit Prophecy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-stone-300">Number</Label>
              <Input
                type="number"
                value={form.number}
                onChange={(e) => set("number", Number(e.target.value))}
                className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-300">ID String</Label>
              <Input
                type="text"
                value={form.idStr}
                onChange={(e) => set("idStr", e.target.value)}
                placeholder="e.g. daniel-2"
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-300">Symbol (emoji)</Label>
              <Input
                type="text"
                value={form.symbol}
                onChange={(e) => set("symbol", e.target.value)}
                placeholder="🗿"
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600"
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
            <Label className="text-stone-300">Subtitle</Label>
            <Input
              type="text"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Scripture</Label>
            <Input
              type="text"
              value={form.scripture}
              onChange={(e) => set("scripture", e.target.value)}
              placeholder="e.g. Daniel 2:31–45"
              className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">What It Reveals</Label>
            <Textarea
              value={form.revealWhat}
              onChange={(e) => set("revealWhat", e.target.value)}
              rows={3}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Historical Fulfilment</Label>
            <Textarea
              value={form.revealHistory}
              onChange={(e) => set("revealHistory", e.target.value)}
              rows={3}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">Christ Connection</Label>
            <Textarea
              value={form.revealChrist}
              onChange={(e) => set("revealChrist", e.target.value)}
              rows={3}
              className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-300">
              Connections <span className="text-stone-500 font-normal">(one slug per line)</span>
            </Label>
            <Textarea
              value={form.connections}
              onChange={(e) => set("connections", e.target.value)}
              rows={3}
              placeholder="daniel-7&#10;daniel-9"
              className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 min-h-[80px] resize-y"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Switch
              checked={form.published}
              onCheckedChange={(v) => set("published", v)}
              id="published"
            />
            <Label htmlFor="published" className="text-stone-300 cursor-pointer font-medium">
              Published
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
