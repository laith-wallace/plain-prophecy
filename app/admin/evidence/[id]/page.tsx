"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

interface NewsItem {
  headline: string;
  meta: string;
  body: string;
}

interface MediaCard {
  href: string;
  icon: string;
  outlet: string;
  outletClass: string;
  headline: string;
  cta: string;
}

interface FormValues {
  num: string;
  label: string;
  title: string;
  order: number;
  published: boolean;
  prophecyColLabel: string;
  prophecyColScripture: string;
  prophecyColContent: { value: string }[];
  scriptureColLabel: string;
  scriptureColScripture: string;
  scriptureColContent: { value: string }[];
  evidenceColLabel: string;
  newsItems: NewsItem[];
  mediaCards: MediaCard[];
}

const DEFAULT_VALUES: FormValues = {
  num: "",
  label: "",
  title: "",
  order: 0,
  published: false,
  prophecyColLabel: "",
  prophecyColScripture: "",
  prophecyColContent: [{ value: "" }],
  scriptureColLabel: "",
  scriptureColScripture: "",
  scriptureColContent: [{ value: "" }],
  evidenceColLabel: "",
  newsItems: [{ headline: "", meta: "", body: "" }],
  mediaCards: [],
};

const inputCls = "bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600";
const textareaCls = `${inputCls} min-h-[80px] resize-y`;
const labelCls = "text-sm font-medium text-stone-300";

export default function EvidenceEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const existing = useQuery(
    api.evidence.getById,
    !isNew ? { id: id as Id<"evidence"> } : "skip"
  );
  const addEvidence = useMutation(api.evidence.add);
  const updateEvidence = useMutation(api.evidence.update);
  const removeEvidence = useMutation(api.evidence.remove);

  const { register, control, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });
  useUnsavedChanges(formState.isDirty);

  const {
    fields: prophecyFields,
    append: appendProphecy,
    remove: removeProphecy,
  } = useFieldArray({ control, name: "prophecyColContent" });

  const {
    fields: scriptureFields,
    append: appendScripture,
    remove: removeScripture,
  } = useFieldArray({ control, name: "scriptureColContent" });

  const {
    fields: newsFields,
    append: appendNews,
    remove: removeNews,
  } = useFieldArray({ control, name: "newsItems" });

  const {
    fields: cardFields,
    append: appendCard,
    remove: removeCard,
  } = useFieldArray({ control, name: "mediaCards" });

  useEffect(() => {
    if (existing) {
      reset({
        num: existing.num,
        label: existing.label,
        title: existing.title,
        order: existing.order,
        published: existing.published,
        prophecyColLabel: existing.prophecyCol.label,
        prophecyColScripture: existing.prophecyCol.scripture,
        prophecyColContent: existing.prophecyCol.content.map((v) => ({ value: v })),
        scriptureColLabel: existing.scriptureCol.label,
        scriptureColScripture: existing.scriptureCol.scripture,
        scriptureColContent: existing.scriptureCol.content.map((v) => ({ value: v })),
        evidenceColLabel: existing.evidenceCol.label,
        newsItems: existing.evidenceCol.newsItems,
        mediaCards: existing.mediaCards,
      });
    }
  }, [existing, reset]);

  async function onSubmit(data: FormValues) {
    try {
      const payload = {
        num: data.num,
        label: data.label,
        title: data.title,
        order: Number(data.order),
        published: data.published,
        prophecyCol: {
          label: data.prophecyColLabel,
          scripture: data.prophecyColScripture,
          content: data.prophecyColContent.map((c) => c.value).filter(Boolean),
        },
        scriptureCol: {
          label: data.scriptureColLabel,
          scripture: data.scriptureColScripture,
          content: data.scriptureColContent.map((c) => c.value).filter(Boolean),
        },
        evidenceCol: {
          label: data.evidenceColLabel,
          newsItems: data.newsItems,
        },
        mediaCards: data.mediaCards,
      };
      if (isNew) {
        await addEvidence(payload);
        toast.success("Section created");
      } else {
        await updateEvidence({ id: id as Id<"evidence">, ...payload });
        toast.success("Section saved");
      }
      router.push("/admin/evidence");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await removeEvidence({ id: id as Id<"evidence"> });
      toast.success("Section deleted");
      router.push("/admin/evidence");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/evidence" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Evidence
        </Link>
        <div className="flex items-center gap-2">
          {!isNew && (
            <DeleteConfirmDialog
              trigger={<Button variant="destructive" size="sm">Delete</Button>}
              onConfirm={handleDelete}
            />
          )}
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Save
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Accordion multiple defaultValue={["basic", "prophecy", "scripture", "evidence", "media"]} className="space-y-2">

          {/* Basic Info */}
          <AccordionItem value="basic" className="bg-stone-900 border border-stone-800 rounded-lg px-4">
            <AccordionTrigger className="text-sm font-medium text-stone-200 hover:no-underline">Basic Info</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCls}>Num</label>
                  <input type="text" {...register("num")} className={inputCls} placeholder="01" />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Order</label>
                  <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Label</label>
                <input type="text" {...register("label")} className={inputCls} placeholder="e.g. The Mark of the Beast" />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Title</label>
                <input type="text" {...register("title")} className={inputCls} />
              </div>
              <div className="flex items-center gap-3">
                <Controller
                  control={control}
                  name="published"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="published"
                    />
                  )}
                />
                <label htmlFor="published" className={`${labelCls} cursor-pointer`}>Published</label>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Prophecy Column */}
          <AccordionItem value="prophecy" className="bg-stone-900 border border-stone-800 rounded-lg px-4">
            <AccordionTrigger className="text-sm font-medium text-stone-200 hover:no-underline">Prophecy Column</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Label</label>
                <input type="text" {...register("prophecyColLabel")} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Scripture Quote <span className="text-stone-500 font-normal">(e.g. Rev 13:16–17)</span></label>
                <input type="text" {...register("prophecyColScripture")} className={inputCls} placeholder="Rev 13:16–17" />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Content Paragraphs</label>
                {prophecyFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <textarea
                      {...register(`prophecyColContent.${index}.value`)}
                      rows={2}
                      className={`${textareaCls} flex-1`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProphecy(index)}
                      className="text-stone-500 hover:text-red-400 mt-1 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendProphecy({ value: "" })}
                  className="border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add paragraph
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Scripture Column */}
          <AccordionItem value="scripture" className="bg-stone-900 border border-stone-800 rounded-lg px-4">
            <AccordionTrigger className="text-sm font-medium text-stone-200 hover:no-underline">Scripture Column</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Label</label>
                <input type="text" {...register("scriptureColLabel")} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Scripture Quote</label>
                <input type="text" {...register("scriptureColScripture")} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className={labelCls}>Content Paragraphs</label>
                {scriptureFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <textarea
                      {...register(`scriptureColContent.${index}.value`)}
                      rows={2}
                      className={`${textareaCls} flex-1`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScripture(index)}
                      className="text-stone-500 hover:text-red-400 mt-1 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendScripture({ value: "" })}
                  className="border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add paragraph
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Evidence Today Column */}
          <AccordionItem value="evidence" className="bg-stone-900 border border-stone-800 rounded-lg px-4">
            <AccordionTrigger className="text-sm font-medium text-stone-200 hover:no-underline">Evidence Today Column</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 pb-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Label</label>
                <input type="text" {...register("evidenceColLabel")} className={inputCls} />
              </div>
              <div className="space-y-3">
                <label className={labelCls}>News Items</label>
                {newsFields.map((field, index) => (
                  <Card key={field.id} className="bg-stone-800 border-stone-700">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400">Item {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNews(index)}
                          className="text-stone-500 hover:text-red-400 px-2 h-7"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-stone-400">Headline</label>
                        <input type="text" {...register(`newsItems.${index}.headline`)} className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-stone-400">Meta <span className="text-stone-500 font-normal">(Source · Year)</span></label>
                        <input type="text" {...register(`newsItems.${index}.meta`)} className={inputCls} placeholder="BBC News · 2024" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-stone-400">Body</label>
                        <textarea {...register(`newsItems.${index}.body`)} rows={2} className={textareaCls} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendNews({ headline: "", meta: "", body: "" })}
                  className="border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add news item
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Media Cards */}
          <AccordionItem value="media" className="bg-stone-900 border border-stone-800 rounded-lg px-4">
            <AccordionTrigger className="text-sm font-medium text-stone-200 hover:no-underline">Media Cards</AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2 pb-4">
              {cardFields.map((field, index) => (
                <Card key={field.id} className="bg-stone-800 border-stone-700">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">Card {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCard(index)}
                        className="text-stone-500 hover:text-red-400 px-2 h-7"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-400">URL</label>
                      <input type="url" {...register(`mediaCards.${index}.href`)} className={inputCls} placeholder="https://..." />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-stone-400">Icon</label>
                        <input type="text" {...register(`mediaCards.${index}.icon`)} className={inputCls} placeholder="🎬" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-stone-400">Outlet</label>
                        <input type="text" {...register(`mediaCards.${index}.outlet`)} className={inputCls} placeholder="BBC" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-400">Outlet Class <span className="text-stone-500 font-normal">(CSS classes)</span></label>
                      <input type="text" {...register(`mediaCards.${index}.outletClass`)} className={inputCls} placeholder="text-red-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-400">Headline</label>
                      <input type="text" {...register(`mediaCards.${index}.headline`)} className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-stone-400">CTA</label>
                      <input type="text" {...register(`mediaCards.${index}.cta`)} className={inputCls} placeholder="Watch now →" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendCard({ href: "", icon: "", outlet: "", outletClass: "", headline: "", cta: "" })}
                className="border-stone-700 text-stone-300 hover:bg-stone-800"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add card
              </Button>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </form>
    </div>
  );
}
