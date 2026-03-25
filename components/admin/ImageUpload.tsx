"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Upload, X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onStorageIdChange?: (storageId: string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, onStorageIdChange, placeholder }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const resolveStorageUrl = useMutation(api.files.resolveStorageUrl);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      const url = await resolveStorageUrl({ storageId });
      if (url) {
        onChange(url);
        onStorageIdChange?.(storageId);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "https://..."}
          className="bg-stone-800 border border-stone-700 text-stone-100 rounded-lg px-3 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-stone-600"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-700 bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onStorageIdChange?.("");
            }}
            className="p-2 rounded-lg border border-stone-700 bg-stone-800 text-stone-500 hover:text-stone-200 hover:bg-stone-700 transition-colors shrink-0"
            title="Clear image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {value && (
        <div className="relative w-full aspect-video max-h-48 rounded-lg overflow-hidden border border-stone-700 bg-stone-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div className="hidden absolute inset-0 flex items-center justify-center text-stone-600">
            <ImageIcon className="w-8 h-8" />
          </div>
        </div>
      )}
    </div>
  );
}
