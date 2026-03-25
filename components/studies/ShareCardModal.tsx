"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Share2, X } from "lucide-react";
import type { StudyLesson } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";
import { generateShareCard, type ShareCardFormat } from "@/lib/generateShareCard";
import "./ShareCardModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  lesson: StudyLesson;
  meta: StudyCardMeta;
}

export default function ShareCardModal({ open, onClose, lesson, meta }: Props) {
  const [format, setFormat] = useState<ShareCardFormat>("square");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Detect Web Share API with file support (iOS/Android) — client-side only
  useEffect(() => {
    if (typeof navigator === "undefined" || typeof navigator.canShare !== "function") return;
    try {
      setCanNativeShare(
        navigator.canShare({ files: [new File([], "test.png", { type: "image/png" })] })
      );
    } catch {
      // canShare throws on some browsers — treat as unsupported
    }
  }, []);

  // Generate preview when modal opens or format changes
  useEffect(() => {
    if (!open || !lesson.keyVerse || !lesson.keyVerseRef) return;

    let cancelled = false;
    setIsGenerating(true);

    generateShareCard({
      keyVerse: lesson.keyVerse,
      keyVerseRef: lesson.keyVerseRef,
      lessonTitle: lesson.title,
      accentColor: meta.accentColor,
      format,
    })
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        setIsGenerating(false);
      })
      .catch(() => {
        if (!cancelled) setIsGenerating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, format, lesson, meta]);

  // Revoke object URL on unmount
  useEffect(() => {
    return () => {
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, []);

  async function handleShare() {
    if (!previewUrl || isGenerating) return;

    const blob = await fetch(previewUrl).then((r) => r.blob());
    const file = new File([blob], `${lesson.slug}-verse.png`, { type: "image/png" });

    if (canNativeShare) {
      try {
        await navigator.share({
          files: [file],
          title: lesson.keyVerseRef,
          text: `"${lesson.keyVerse}" — ${lesson.keyVerseRef}\n\nPlainProphecy.com`,
        });
      } catch {
        // User cancelled — not an error
      }
    } else {
      const a = document.createElement("a");
      a.href = previewUrl;
      a.download = `${lesson.slug}-verse.png`;
      a.click();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        />
        <Dialog.Popup
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 201,
            width: "min(460px, calc(100vw - 2rem))",
            background: "#141210",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
            overflow: "hidden",
            fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
            maxHeight: "92dvh",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div className="scm-header">
            <span className="scm-title">Share this verse</span>
            <button className="scm-close" onClick={onClose} aria-label="Close">
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Format selector */}
          <div className="scm-format-row">
            {(["square", "portrait"] as const).map((f) => (
              <button
                key={f}
                className={`scm-format-btn ${format === f ? "scm-format-btn--active" : ""}`}
                onClick={() => setFormat(f)}
              >
                {f === "square" ? "Square (Feed)" : "Portrait (Story)"}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className={`scm-preview-wrap${format === "portrait" ? " scm-preview-wrap--portrait" : ""}`}>
            {isGenerating || !previewUrl ? (
              <div
                className={`scm-preview-skeleton${format === "portrait" ? " scm-preview-skeleton--portrait" : ""}`}
              />
            ) : (
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={`Scripture card for ${lesson.keyVerseRef}`}
                className="scm-preview"
              />
            )}
          </div>

          {/* Action */}
          <div className="scm-actions">
            <button
              className="scm-btn scm-btn--primary"
              onClick={handleShare}
              disabled={isGenerating || !previewUrl}
            >
              <Share2 size={15} strokeWidth={2} />
              {canNativeShare ? "Save to Camera Roll" : "Download"}
            </button>
          </div>

          {/* Hint */}
          <p className="scm-hint">
            {canNativeShare
              ? "Saves directly to your camera roll"
              : "PNG \u00B7 1080px \u00B7 ready to post"}
          </p>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
