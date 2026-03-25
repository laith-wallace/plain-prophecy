"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/admin/ImageUpload";
import { RefreshCw, X } from "lucide-react";
import { generateSlug } from "@/lib/slug";

export interface BlogDetailsPanelFormState {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorBio: string;
  authorImage: string;
  authorTwitter: string;
  authorLinkedIn: string;
  publishedAt: string;
  readingTime: string;
  tags: string;
  coverImage: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

interface BlogDetailsPanelProps {
  form: BlogDetailsPanelFormState;
  set: <K extends keyof BlogDetailsPanelFormState>(key: K, value: BlogDetailsPanelFormState[K]) => void;
  onClose: () => void;
}

export default function BlogDetailsPanel({ form, set, onClose }: BlogDetailsPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[40%] bg-stone-950 border-l border-stone-800 flex flex-col overflow-hidden">
        {/* Panel header */}
        <div className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-stone-800">
          <span className="text-sm font-medium text-stone-200">Post Details</span>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-300 transition-colors"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-6">
          {/* Slug */}
          <div className="space-y-1.5">
            <Label className="text-stone-300">
              Slug <span className="text-stone-500 font-normal text-xs">(URL)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="my-post-title"
                className="bg-stone-900 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 flex-1 text-sm"
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
              <p className="text-xs text-stone-500 break-all">
                /blog/<span className="text-stone-400">{form.slug}</span>
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <Label className="text-stone-300">Excerpt</Label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={3}
              className="bg-stone-900 border-stone-700 text-stone-100 focus-visible:ring-amber-600 resize-y text-sm"
            />
          </div>

          {/* Author + Date row */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-stone-300">Author Name</Label>
              <Input
                type="text"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className="bg-stone-900 border-stone-700 text-stone-100 focus-visible:ring-amber-600 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-300">Publish Date</Label>
                <Input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => set("publishedAt", e.target.value)}
                  className="bg-stone-900 border-stone-700 text-stone-100 focus-visible:ring-amber-600 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-300">Read Time (min)</Label>
                <Input
                  type="number"
                  value={form.readingTime}
                  onChange={(e) => set("readingTime", e.target.value)}
                  className="bg-stone-900 border-stone-700 text-stone-100 focus-visible:ring-amber-600 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-stone-300">
                Tags <span className="text-stone-500 font-normal text-xs">(comma-separated)</span>
              </Label>
              <Input
                type="text"
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="daniel, prophecy"
                className="bg-stone-900 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 text-sm"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <Label className="text-stone-300">Cover Image</Label>
            <ImageUpload
              value={form.coverImage}
              onChange={(url) => set("coverImage", url)}
            />
          </div>

          {/* Author details */}
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-xs text-stone-400 font-medium uppercase tracking-wide">Author Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-3 pb-3">
              <div className="space-y-1.5">
                <Label className="text-stone-300 text-xs">Bio</Label>
                <Textarea
                  value={form.authorBio}
                  onChange={(e) => set("authorBio", e.target.value)}
                  rows={3}
                  className="bg-stone-800 border-stone-700 text-stone-100 focus-visible:ring-amber-600 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-300 text-xs">Author Image</Label>
                <ImageUpload
                  value={form.authorImage}
                  onChange={(url) => set("authorImage", url)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-stone-300 text-xs">Twitter</Label>
                  <Input
                    type="text"
                    value={form.authorTwitter}
                    onChange={(e) => set("authorTwitter", e.target.value)}
                    placeholder="handle"
                    className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-stone-300 text-xs">LinkedIn</Label>
                  <Input
                    type="text"
                    value={form.authorLinkedIn}
                    onChange={(e) => set("authorLinkedIn", e.target.value)}
                    placeholder="username"
                    className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="text-xs text-stone-400 font-medium uppercase tracking-wide">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-3 pb-3">
              <div className="space-y-1.5">
                <Label className="text-stone-300 text-xs">
                  Meta Title <span className="text-stone-500 font-normal">(overrides page title)</span>
                </Label>
                <Input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) => set("metaTitle", e.target.value)}
                  placeholder={form.title || "Defaults to post title"}
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 text-sm"
                />
                {form.metaTitle && (
                  <p className="text-xs text-stone-500">{form.metaTitle.length} / 60</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-stone-300 text-xs">
                  Meta Description <span className="text-stone-500 font-normal">(search snippet)</span>
                </Label>
                <Textarea
                  value={form.metaDescription}
                  onChange={(e) => set("metaDescription", e.target.value)}
                  rows={2}
                  placeholder={form.excerpt || "Defaults to excerpt"}
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-600 text-sm resize-y"
                />
                {form.metaDescription && (
                  <p className="text-xs text-stone-500">{form.metaDescription.length} / 160</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-stone-300 text-xs">OG Image (social share)</Label>
                <ImageUpload
                  value={form.ogImage}
                  onChange={(url) => set("ogImage", url)}
                  placeholder={form.coverImage || "https://..."}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Footer for Primary Action */}
        <div className="shrink-0 p-4 border-t border-stone-800 bg-stone-900/95 backdrop-blur-md flex items-center justify-between shadow-[0_-8px_16px_rgba(0,0,0,0.5)] z-20">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Status</span>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${form.published ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" : "bg-stone-600"}`} />
              <span className={`text-sm font-semibold transition-colors duration-300 ${form.published ? "text-emerald-400" : "text-stone-400"}`}>
                {form.published ? "Post is Live" : "Post is Draft"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-950/80 border border-stone-800/50 px-4 py-2.5 rounded-2xl shadow-inner transition-all hover:border-stone-700 group">
            <label htmlFor="footer-published" className="text-xs font-bold text-stone-300 cursor-pointer select-none group-hover:text-stone-100 transition-colors">
              Publish
            </label>
            <Switch
              checked={form.published}
              onCheckedChange={(v) => set("published", v)}
              id="footer-published"
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
        </div>
      </div>
    </>
  );
}
