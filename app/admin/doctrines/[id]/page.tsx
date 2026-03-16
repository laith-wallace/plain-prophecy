"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";
import { toast } from "sonner";
import Link from "next/link";
import { Trash2, Plus, RefreshCw } from "lucide-react";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { generateSlug, isValidSlug } from "@/lib/slug";
import ImageUpload from "@/components/admin/ImageUpload";

type CategoryType = "rapture" | "antichrist" | "daniel" | "revelation";

interface ContentBlock {
  label: string;
  text: string;
}

interface SectionForm {
  id: string;
  heading: string;
  badge: string;
  era: string;
  christCentre: string;
  hasKeyVerse: boolean;
  keyVerseText: string;
  keyVerseRef: string;
  contentBlocks: ContentBlock[];
}

interface FormValues {
  title: string;
  slug: string;
  subtitle: string;
  scriptureRef: string;
  category: CategoryType;
  order: number;
  published: boolean;
  intro: string;
  christCentre: string;
  verdict: string;
  hasNextDoctrine: boolean;
  nextDoctrineSlug: string;
  nextDoctrineTitle: string;
  sections: SectionForm[];
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

const DEFAULT_SECTION = (id: string, heading: string): SectionForm => ({
  id,
  heading,
  badge: "",
  era: "",
  christCentre: "",
  hasKeyVerse: false,
  keyVerseText: "",
  keyVerseRef: "",
  contentBlocks: [{ label: "", text: "" }],
});

const DEFAULT_NEW_SECTIONS: SectionForm[] = [
  DEFAULT_SECTION("claim", "The Claim"),
  DEFAULT_SECTION("scripture", "What Scripture Says"),
  DEFAULT_SECTION("history", "Where This Came From"),
  DEFAULT_SECTION("alternative", "The Biblical Alternative"),
];

const DEFAULT_VALUES: FormValues = {
  title: "",
  slug: "",
  subtitle: "",
  scriptureRef: "",
  category: "daniel",
  order: 0,
  published: false,
  intro: "",
  christCentre: "",
  verdict: "",
  hasNextDoctrine: false,
  nextDoctrineSlug: "",
  nextDoctrineTitle: "",
  sections: DEFAULT_NEW_SECTIONS,
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
};

const inputCls = "bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600";
const textareaCls = "bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 min-h-[80px] resize-y";
const labelCls = "text-stone-300";
const smallLabelCls = "text-xs text-stone-400";

function SectionEditor({
  sectionIndex,
  control,
  register,
  watch,
  remove,
}: {
  sectionIndex: number;
  control: ReturnType<typeof useForm<FormValues>>["control"];
  register: ReturnType<typeof useForm<FormValues>>["register"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  remove: (index: number) => void;
}) {
  const { fields, append, remove: removeBlock } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.contentBlocks`,
  });

  const hasKeyVerse = watch(`sections.${sectionIndex}.hasKeyVerse`);
  const sectionId = watch(`sections.${sectionIndex}.id`);
  const sectionHeading = watch(`sections.${sectionIndex}.heading`);

  return (
    <div className="border border-stone-700 rounded-lg bg-stone-800/50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-700">
        <div>
          <span className="text-sm font-medium text-stone-200">{sectionHeading || "Untitled Section"}</span>
          {sectionId && (
            <span className="ml-2 text-xs text-stone-500 font-mono">#{sectionId}</span>
          )}
        </div>
        <DeleteConfirmDialog
          trigger={
            <Button type="button" variant="ghost" size="sm" className="text-stone-500 hover:text-red-400 px-2">
              <Trash2 className="w-4 h-4" />
            </Button>
          }
          title="Remove this section?"
          description="This will permanently remove the section and all its content blocks."
          onConfirm={() => remove(sectionIndex)}
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className={smallLabelCls}>Section ID</Label>
            <input
              type="text"
              {...register(`sections.${sectionIndex}.id`)}
              className={inputCls}
              placeholder="e.g. claim, scripture"
            />
          </div>
          <div className="space-y-1.5">
            <Label className={smallLabelCls}>Heading</Label>
            <input
              type="text"
              {...register(`sections.${sectionIndex}.heading`)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className={smallLabelCls}>Badge <span className="text-stone-600 font-normal">(optional)</span></Label>
            <input
              type="text"
              {...register(`sections.${sectionIndex}.badge`)}
              className={inputCls}
              placeholder="e.g. New Teaching"
            />
          </div>
          <div className="space-y-1.5">
            <Label className={smallLabelCls}>Era <span className="text-stone-600 font-normal">(optional)</span></Label>
            <input
              type="text"
              {...register(`sections.${sectionIndex}.era`)}
              className={inputCls}
              placeholder="e.g. 1830s"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className={smallLabelCls}>Christ-Centre <span className="text-stone-600 font-normal">(optional)</span></Label>
          <Textarea
            {...register(`sections.${sectionIndex}.christCentre`)}
            rows={2}
            className={textareaCls}
          />
        </div>

        {/* Key Verse Toggle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name={`sections.${sectionIndex}.hasKeyVerse`}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={`keyVerse-${sectionIndex}`}
                />
              )}
            />
            <Label
              htmlFor={`keyVerse-${sectionIndex}`}
              className={`${smallLabelCls} cursor-pointer`}
            >
              Add key verse
            </Label>
          </div>
          {hasKeyVerse && (
            <div className="grid grid-cols-3 gap-3 pl-1">
              <div className="col-span-2 space-y-1.5">
                <Label className={smallLabelCls}>Verse Text</Label>
                <Textarea
                  {...register(`sections.${sectionIndex}.keyVerseText`)}
                  rows={2}
                  className={textareaCls}
                />
              </div>
              <div className="space-y-1.5">
                <Label className={smallLabelCls}>Reference</Label>
                <Input
                  type="text"
                  {...register(`sections.${sectionIndex}.keyVerseRef`)}
                  className={inputCls}
                  placeholder="Rev 13:5"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Blocks */}
        <div className="space-y-2">
          <Label className={smallLabelCls}>Content Blocks</Label>
          {fields.map((block, blockIndex) => (
            <div key={block.id} className="border border-stone-700 rounded-lg p-3 bg-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">Block {blockIndex + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBlock(blockIndex)}
                  className="text-stone-600 hover:text-red-400 px-2 h-6"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-stone-500">Label</Label>
                <input
                  type="text"
                  {...register(`sections.${sectionIndex}.contentBlocks.${blockIndex}.label`)}
                  className={inputCls}
                  placeholder="e.g. The Historicist view"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-stone-500">Text</Label>
                <Textarea
                  {...register(`sections.${sectionIndex}.contentBlocks.${blockIndex}.text`)}
                  rows={3}
                  className={`${inputCls} min-h-[80px] resize-y`}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ label: "", text: "" })}
            className="border-stone-600 text-stone-400 hover:bg-stone-700 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" /> Add content block
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DoctrineEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const existing = useQuery(
    api.doctrines.getByIdAdmin,
    !isNew ? { id: id as Id<"doctrines"> } : "skip"
  );
  const addDoctrine = useMutation(api.doctrines.add);
  const updateDoctrine = useMutation(api.doctrines.update);
  const removeDoctrine = useMutation(api.doctrines.remove);

  const { register, control, handleSubmit, reset, watch, getValues, setValue, formState } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });
  useUnsavedChanges(formState.isDirty);

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: "sections" });

  const hasNextDoctrine = watch("hasNextDoctrine");
  const slugValue = watch("slug");
  const publishedValue = watch("published");

  useEffect(() => {
    if (existing) {
      reset({
        title: existing.title,
        slug: existing.slug,
        subtitle: existing.subtitle,
        scriptureRef: existing.scriptureRef,
        category: existing.category,
        order: existing.order,
        published: existing.published,
        intro: existing.intro,
        christCentre: existing.christCentre,
        verdict: existing.verdict,
        hasNextDoctrine: !!existing.nextDoctrine,
        nextDoctrineSlug: existing.nextDoctrine?.slug ?? "",
        nextDoctrineTitle: existing.nextDoctrine?.title ?? "",
        sections: existing.sections.map((s) => ({
          id: s.id,
          heading: s.heading,
          badge: s.badge ?? "",
          era: s.era ?? "",
          christCentre: s.christCentre ?? "",
          hasKeyVerse: !!s.keyVerse,
          keyVerseText: s.keyVerse?.text ?? "",
          keyVerseRef: s.keyVerse?.ref ?? "",
          contentBlocks: s.contentBlocks,
        })),
        metaTitle: existing.metaTitle ?? "",
        metaDescription: existing.metaDescription ?? "",
        ogImage: existing.ogImage ?? "",
      });
    }
  }, [existing, reset]);

  async function onSubmit(data: FormValues) {
    if (data.slug && !isValidSlug(data.slug)) {
      toast.error("Slug can only contain lowercase letters, numbers, and hyphens");
      return;
    }
    try {
      const payload = {
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        scriptureRef: data.scriptureRef,
        category: data.category,
        order: Number(data.order),
        published: data.published,
        intro: data.intro,
        christCentre: data.christCentre,
        verdict: data.verdict,
        nextDoctrine:
          data.hasNextDoctrine && data.nextDoctrineSlug
            ? { slug: data.nextDoctrineSlug, title: data.nextDoctrineTitle }
            : undefined,
        sections: data.sections.map((s) => ({
          id: s.id,
          heading: s.heading,
          badge: s.badge || undefined,
          era: s.era || undefined,
          christCentre: s.christCentre || undefined,
          keyVerse:
            s.hasKeyVerse && s.keyVerseText
              ? { text: s.keyVerseText, ref: s.keyVerseRef }
              : undefined,
          contentBlocks: s.contentBlocks,
        })),
        metaTitle: data.metaTitle || undefined,
        metaDescription: data.metaDescription || undefined,
        ogImage: data.ogImage || undefined,
      };

      if (isNew) {
        await addDoctrine(payload);
        toast.success("Doctrine created");
      } else {
        await updateDoctrine({ id: id as Id<"doctrines">, ...payload });
        toast.success("Doctrine saved");
      }
      router.push("/admin/doctrines");
    } catch (err) {
      toast.error("Failed to save");
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      await removeDoctrine({ id: id as Id<"doctrines"> });
      toast.success("Doctrine deleted");
      router.push("/admin/doctrines");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  }

  const titleField = register("title");

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/doctrines" className="text-sm text-stone-400 hover:text-stone-200 flex items-center gap-1">
          ← Back to Doctrines
        </Link>
        <div className="flex items-center gap-2">
          {!isNew && slugValue && publishedValue && (
            <Link
              href={`/doctrine/${slugValue}`}
              target="_blank"
              className="text-xs text-stone-500 hover:text-amber-400 transition-colors"
            >
              View live ↗
            </Link>
          )}
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
        {/* Core Fields */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-base">{isNew ? "New Doctrine" : "Edit Doctrine"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelCls}>Title</Label>
                <input
                  {...titleField}
                  onBlur={(e) => {
                    titleField.onBlur(e);
                    if (!getValues("slug")) setValue("slug", generateSlug(e.target.value));
                  }}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Slug</Label>
                <div className="flex gap-2">
                  <Input type="text" {...register("slug")} className={`${inputCls} flex-1`} placeholder="e.g. pre-trib-rapture" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setValue("slug", generateSlug(getValues("title")))}
                    className="border-stone-700 text-stone-400 hover:bg-stone-800 shrink-0"
                    title="Regenerate slug from title"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </Button>
                </div>
                {slugValue && (
                  <p className="text-xs text-stone-500">
                    plainprophecy.com/doctrine/<span className="text-stone-400">{slugValue}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>Subtitle</Label>
              <Input type="text" {...register("subtitle")} className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelCls}>Scripture Reference</Label>
                <Input type="text" {...register("scriptureRef")} className={inputCls} placeholder="e.g. 1 Thess 4:16–17" />
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Category</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-100 focus:ring-amber-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-800 border-stone-700 text-stone-100">
                        <SelectItem value="rapture">Rapture</SelectItem>
                        <SelectItem value="antichrist">Antichrist</SelectItem>
                        <SelectItem value="daniel">Daniel</SelectItem>
                        <SelectItem value="revelation">Revelation</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelCls}>Order</Label>
                <Input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} />
              </div>
              <div className="flex items-center gap-3 pt-6">
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
                <Label htmlFor="published" className={`${labelCls} cursor-pointer`}>Published</Label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>Intro</Label>
              <Textarea {...register("intro")} rows={4} className={textareaCls} />
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>Christ at the Centre <span className="text-stone-500 font-normal">(closing reflection)</span></Label>
              <Textarea {...register("christCentre")} rows={3} className={textareaCls} />
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>Verdict</Label>
              <Textarea {...register("verdict")} rows={3} className={textareaCls} />
            </div>

            {/* Next Doctrine */}
            <div className="space-y-3 pt-1 border-t border-stone-800">
              <div className="flex items-center gap-3 pt-3">
                <Controller
                  control={control}
                  name="hasNextDoctrine"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="hasNextDoctrine"
                    />
                  )}
                />
                <Label htmlFor="hasNextDoctrine" className={`${labelCls} cursor-pointer`}>
                  Add next doctrine link
                </Label>
              </div>
              {hasNextDoctrine && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className={labelCls}>Next Doctrine Slug</Label>
                    <Input type="text" {...register("nextDoctrineSlug")} className={inputCls} placeholder="e.g. antichrist" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className={labelCls}>Next Doctrine Title</Label>
                    <Input type="text" {...register("nextDoctrineTitle")} className={inputCls} placeholder="e.g. Who is the Antichrist?" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-200">Sections</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSection(DEFAULT_SECTION("", ""))}
              className="border-stone-700 text-stone-300 hover:bg-stone-800"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add section
            </Button>
          </div>

          {sectionFields.length === 0 && (
            <p className="text-sm text-stone-500 text-center py-6 border border-stone-800 rounded-lg bg-stone-900">
              No sections. Add one above.
            </p>
          )}

          <div className="space-y-3">
            {sectionFields.map((field, index) => (
              <SectionEditor
                key={field.id}
                sectionIndex={index}
                control={control}
                register={register}
                watch={watch}
                remove={removeSection}
              />
            ))}
          </div>
        </div>

        {/* SEO */}
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-base">SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className={labelCls}>
                Meta Title <span className="text-stone-500 font-normal">(overrides page title in search results)</span>
              </Label>
              <input
                type="text"
                {...register("metaTitle")}
                placeholder="Defaults to doctrine title"
                className={inputCls}
              />
              {watch("metaTitle") && (
                <p className="text-xs text-stone-500">{watch("metaTitle").length} / 60 chars</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>
                Meta Description <span className="text-stone-500 font-normal">(shown in search snippets)</span>
              </Label>
              <Textarea
                {...register("metaDescription")}
                rows={2}
                placeholder="Defaults to intro"
                className={`${inputCls} min-h-[70px] resize-y`}
              />
              {watch("metaDescription") && (
                <p className="text-xs text-stone-500">{watch("metaDescription").length} / 160 chars</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className={labelCls}>
                OG Image <span className="text-stone-500 font-normal">(social share image)</span>
              </Label>
              <Controller
                control={control}
                name="ogImage"
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
