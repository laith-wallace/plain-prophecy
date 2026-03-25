"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";
import ImageUpload from "@/components/admin/ImageUpload";
import StudyCardPreview from "@/components/admin/StudyCardPreview";

type ContentBlock = { label: string; text: string };
type Section = {
  id: string;
  heading: string;
  era: string;
  badge: string;
  body: string;
  christCentre: string;
  hasKeyVerse: boolean;
  keyVerseText: string;
  keyVerseRef: string;
  contentBlocks: ContentBlock[];
};

type FormValues = {
  title: string;
  slug: string;
  scriptureRef: string;
  readingTime: number;
  published: boolean;
  keyVerse: string;
  keyVerseRef: string;
  intro: string;
  christCentre: string;
  nextLessonBook: string;
  nextLessonSlug: string;
  nextLessonTitle: string;
  sections: Section[];
  cardImageId: string;
  cardImageUrl: string;
};

const defaultSection = (): Section => ({
  id: "",
  heading: "",
  era: "",
  badge: "",
  body: "",
  christCentre: "",
  hasKeyVerse: false,
  keyVerseText: "",
  keyVerseRef: "",
  contentBlocks: [],
});

export default function LessonEditorPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const isNew = lessonId === "new";

  const lesson = useQuery(
    api.studyLessons.getByIdAdmin,
    isNew ? "skip" : { id: lessonId as Id<"studyLessons"> }
  );

  const addLesson = useMutation(api.studyLessons.add);
  const updateLesson = useMutation(api.studyLessons.update);

  const { register, control, handleSubmit, reset, watch, setValue, formState } = useForm<FormValues>({
    defaultValues: {
      title: "",
      slug: "",
      scriptureRef: "",
      readingTime: 5,
      published: false,
      keyVerse: "",
      keyVerseRef: "",
      intro: "",
      christCentre: "",
      nextLessonBook: "",
      nextLessonSlug: "",
      nextLessonTitle: "",
      sections: [],
      cardImageId: "",
      cardImageUrl: "",
    },
  });

  const { fields: sections, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: "sections",
  });

  const title = watch("title");

  // Auto-derive slug on new
  useEffect(() => {
    if (isNew) {
      setValue("slug", title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title, isNew, setValue]);

  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        slug: lesson.slug,
        scriptureRef: lesson.scriptureRef,
        readingTime: lesson.readingTime ?? 5,
        published: lesson.published,
        keyVerse: lesson.keyVerse ?? "",
        keyVerseRef: lesson.keyVerseRef ?? "",
        intro: lesson.intro ?? "",
        christCentre: lesson.christCentre ?? "",
        nextLessonBook: lesson.nextLesson?.book ?? "",
        nextLessonSlug: lesson.nextLesson?.lesson ?? "",
        nextLessonTitle: lesson.nextLesson?.title ?? "",
        sections: (lesson.sections ?? []).map((s) => ({
          id: s.id ?? "",
          heading: s.heading,
          era: s.era ?? "",
          badge: s.badge ?? "",
          body: s.body ?? "",
          christCentre: s.christCentre ?? "",
          hasKeyVerse: !!s.keyVerse,
          keyVerseText: s.keyVerse?.text ?? "",
          keyVerseRef: s.keyVerse?.ref ?? "",
          contentBlocks: s.contentBlocks ?? [],
        })),
        cardImageId: lesson.cardImageId ?? "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cardImageUrl: (lesson as any).cardImageUrl ?? "",
      });
    }
  }, [lesson, reset]);

  useUnsavedChanges(formState.isDirty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: FormValues) {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        courseId: courseId as Id<"studyCourses">,
        slug: data.slug,
        title: data.title,
        order: lesson?.order ?? 0,
        body: lesson?.body ?? "",
        scriptureRef: data.scriptureRef,
        tags: lesson?.tags ?? [],
        published: data.published,
        readingTime: data.readingTime,
        keyVerse: data.keyVerse || undefined,
        keyVerseRef: data.keyVerseRef || undefined,
        intro: data.intro || undefined,
        christCentre: data.christCentre || undefined,
        nextLesson: data.nextLessonBook
          ? { book: data.nextLessonBook, lesson: data.nextLessonSlug, title: data.nextLessonTitle }
          : undefined,
        sections: data.sections.map((s) => ({
          id: s.id || undefined,
          heading: s.heading,
          era: s.era || undefined,
          badge: s.badge || undefined,
          body: s.body || undefined,
          christCentre: s.christCentre || undefined,
          keyVerse: s.hasKeyVerse && s.keyVerseText
            ? { text: s.keyVerseText, ref: s.keyVerseRef }
            : undefined,
          contentBlocks: s.contentBlocks.length > 0 ? s.contentBlocks : undefined,
        })),
        cardImageId: data.cardImageId || undefined,
      };

      if (isNew) {
        await addLesson(payload);
        toast.success("Lesson created successfully!", {
          style: { background: "#10b981", color: "#fff", border: "none" },
        });
        router.push(`/admin/studies/${courseId}`);
      } else {
        await updateLesson({ id: lessonId as Id<"studyLessons">, ...payload });
        toast.success("Changes saved successfully!", {
          style: { background: "#10b981", color: "#fff", border: "none" },
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred while saving.";
      setError(msg);
      toast.error("Failed to save. Please check the error below.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <Link href={`/admin/studies/${courseId}`} className="flex items-center gap-1 text-sm text-stone-400 hover:text-stone-200">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Book
        </Link>
        <Button onClick={handleSubmit(onSubmit)} disabled={saving}>
          {saving ? "Saving…" : isNew ? "Create Lesson" : "Save Lesson"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-950/20 border-red-900/50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Saving Lesson</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Top fields */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1 mr-8">
              <h2 className="text-sm font-semibold text-stone-300">Lesson Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-stone-300">Title</Label>
                  <input {...register("title")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="Daniel 2" />
                </div>
                <div className="space-y-1">
                  <Label className="text-stone-300">Slug</Label>
                  <input {...register("slug")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="daniel-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-stone-300">Scripture Reference</Label>
                  <input {...register("scriptureRef")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="Daniel 2:1-49" />
                </div>
                <div className="space-y-1">
                  <Label className="text-stone-300">Reading Time (minutes)</Label>
                  <input type="number" {...register("readingTime", { valueAsNumber: true })} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={watch("published")} onCheckedChange={(v) => setValue("published", v)} />
                <Label className="text-stone-300">Published</Label>
              </div>
            </div>

            <div className="shrink-0 scale-[0.85] origin-top-right">
              <StudyCardPreview 
                lesson={{
                  slug: watch("slug"),
                  title: watch("title"),
                  scriptureRef: watch("scriptureRef"),
                  readingTime: watch("readingTime"),
                }}
                cardImageUrl={watch("cardImageUrl")}
              />
            </div>
          </div>
        </div>

        {/* Study Card artwork */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-stone-300">Study Card Artwork</h2>
          <p className="text-xs text-stone-500">Upload a custom artwork image for this study card. This will override the default icon/emoji and legacy hardcoded images.</p>
          
          <ImageUpload 
            value={watch("cardImageUrl")} 
            onChange={(url) => {
              setValue("cardImageUrl", url, { shouldDirty: true });
            }} 
            onStorageIdChange={(id) => {
              setValue("cardImageId", id, { shouldDirty: true });
            }}
            placeholder="Upload or paste image URL..."
          />
        </div>

        {/* Key verse */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-stone-300">Key Verse</h2>
          <div className="space-y-1">
            <Label className="text-stone-300">Verse text</Label>
            <textarea {...register("keyVerse")} rows={2} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="&quot;But Daniel resolved that he would not defile himself…&quot;" />
          </div>
          <div className="space-y-1">
            <Label className="text-stone-300">Reference (e.g. Daniel 1:8)</Label>
            <input {...register("keyVerseRef")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
          </div>
        </div>

        {/* Intro */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-stone-300">Intro Paragraph</h2>
          <p className="text-xs text-stone-500">The hook shown in the lesson header.</p>
          <textarea {...register("intro")} rows={3} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
        </div>

        {/* Sections */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-stone-300">Sections</h2>
          <p className="text-xs text-stone-500">Each section = one panel in the lesson. The Section ID controls the gradient colour (use: gold, silver, bronze, iron, clay, stone).</p>

          <Accordion multiple className="space-y-2">
            {sections.map((field, index) => (
              <SectionEditor
                key={field.id}
                index={index}
                register={register}
                control={control}
                watch={watch}
                setValue={setValue}
                onRemove={() => removeSection(index)}
              />
            ))}
          </Accordion>

          <Button
            type="button"
            variant="outline"
            onClick={() => appendSection(defaultSection())}
            className="w-full"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Section
          </Button>
        </div>

        {/* Christ at the Centre */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-stone-300">Christ at the Centre</h2>
          <p className="text-xs text-stone-500">The closing reflection that anchors the whole lesson to Jesus.</p>
          <textarea {...register("christCentre")} rows={4} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
        </div>

        {/* Next lesson */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-semibold text-stone-300">Next Lesson Link (optional)</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label className="text-stone-300 text-xs">Book slug</Label>
              <input {...register("nextLessonBook")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="daniel" />
            </div>
            <div className="space-y-1">
              <Label className="text-stone-300 text-xs">Lesson slug</Label>
              <input {...register("nextLessonSlug")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="daniel-3" />
            </div>
            <div className="space-y-1">
              <Label className="text-stone-300 text-xs">Display title</Label>
              <input {...register("nextLessonTitle")} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="Daniel 3" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Sub-component for each section
function SectionEditor({
  index,
  register,
  control,
  watch,
  setValue,
  onRemove,
}: {
  index: number;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  control: ReturnType<typeof useForm<FormValues>>["control"];
  watch: ReturnType<typeof useForm<FormValues>>["watch"];
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
  onRemove: () => void;
}) {
  const { fields: blocks, append: appendBlock, remove: removeBlock } = useFieldArray({
    control,
    name: `sections.${index}.contentBlocks`,
  });

  const hasKeyVerse = watch(`sections.${index}.hasKeyVerse`);
  const heading = watch(`sections.${index}.heading`);

  return (
    <AccordionItem value={`section-${index}`} className="border border-stone-700 rounded-lg overflow-hidden">
      <AccordionTrigger className="px-4 py-3 text-sm font-medium text-stone-200 hover:bg-stone-800/50 [&>svg]:text-stone-400">
        {heading || `Section ${index + 1}`}
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-stone-300 text-xs">Section ID (controls colour)</Label>
            <input {...register(`sections.${index}.id`)} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="gold" />
          </div>
          <div className="space-y-1">
            <Label className="text-stone-300 text-xs">Heading</Label>
            <input {...register(`sections.${index}.heading`)} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" placeholder="The Statue's Head" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-stone-300 text-xs">Era (e.g. 605–539 BC)</Label>
            <input {...register(`sections.${index}.era`)} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
          </div>
          <div className="space-y-1">
            <Label className="text-stone-300 text-xs">Badge label (e.g. Gold)</Label>
            <input {...register(`sections.${index}.badge`)} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-stone-300 text-xs">Body text (used when no content blocks)</Label>
          <textarea {...register(`sections.${index}.body`)} rows={3} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
        </div>

        {/* Content blocks */}
        <div className="space-y-2">
          <Label className="text-stone-300 text-xs">Content Blocks (labelled text blocks)</Label>
          {blocks.map((block, bi) => (
            <div key={block.id} className="space-y-1 bg-stone-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <Label className="text-stone-400 text-xs">Block {bi + 1}</Label>
                <button type="button" onClick={() => removeBlock(bi)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input {...register(`sections.${index}.contentBlocks.${bi}.label`)} placeholder="Label (e.g. Babylon)" className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
              <textarea {...register(`sections.${index}.contentBlocks.${bi}.text`)} rows={3} placeholder="Content text…" className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendBlock({ label: "", text: "" })}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
          >
            <Plus className="w-3 h-3" /> Add content block
          </button>
        </div>

        {/* Christ at Centre (section-level) */}
        <div className="space-y-1">
          <Label className="text-stone-300 text-xs">Christ at the Centre (this section)</Label>
          <textarea {...register(`sections.${index}.christCentre`)} rows={2} className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
        </div>

        {/* Key verse toggle */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={hasKeyVerse}
              onCheckedChange={(v) => setValue(`sections.${index}.hasKeyVerse`, v)}
            />
            <Label className="text-stone-300 text-xs">Add key verse</Label>
          </div>
          {hasKeyVerse && (
            <div className="space-y-2 bg-stone-800/50 rounded-lg p-3">
              <textarea {...register(`sections.${index}.keyVerseText`)} rows={2} placeholder="Verse text" className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-600" />
              <input {...register(`sections.${index}.keyVerseRef`)} placeholder="Reference (e.g. Dan 2:44)" className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 mt-1"
        >
          <Trash2 className="w-3 h-3" /> Remove this section
        </button>
      </AccordionContent>
    </AccordionItem>
  );
}
