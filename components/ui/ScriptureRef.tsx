"use client"

import React, { useState, type CSSProperties } from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { fetchVerse, type VerseResult } from "@/lib/bible/fetchVerse"

interface ScriptureRefProps {
  children: string
  className?: string
  style?: CSSProperties
}

export function ScriptureRef({ children, className, style }: ScriptureRefProps) {
  const [open, setOpen] = useState(false)
  const [verse, setVerse] = useState<VerseResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && !verse && !loading) {
      setLoading(true)
      setError(false)
      fetchVerse(children)
        .then((v) => {
          setVerse(v)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger
        nativeButton={false}
        render={
          <span
            className={className}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textDecorationColor: "rgba(201,168,76,0.6)",
              textUnderlineOffset: "3px",
              color: "var(--gold, #C9A84C)",
              // Ensure a generous touch target even for short refs
              paddingTop: "0.25em",
              paddingBottom: "0.25em",
              ...style,
            }}
          />
        }
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="top"
          sideOffset={8}
          align="center"
          className="isolate z-[200]"
        >
          <PopoverPrimitive.Popup
            className="data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
            style={{
              background: "#141210",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
              padding: "16px",
              maxWidth: "min(320px, calc(100vw - 2rem))",
              width: "max-content",
              position: "relative",
            }}
          >
            {/* Header row: reference + close button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: loading || error ? 10 : 10,
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: "var(--gold, #C9A84C)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  flexShrink: 0,
                }}
              >
                {verse ? verse.reference : children}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {/* Translation badge */}
                {!loading && !error && (
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 9,
                      color: "rgba(255,255,255,0.35)",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      padding: "2px 6px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    WEB
                  </span>
                )}

                {/* Close button — critical for mobile dismissal */}
                <PopoverPrimitive.Close
                  render={
                    <button
                      aria-label="Close verse preview"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 16,
                        lineHeight: 1,
                        padding: "4px 6px",
                        borderRadius: 6,
                        minWidth: 28,
                        minHeight: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  }
                >
                  ×
                </PopoverPrimitive.Close>
              </div>
            </div>

            {/* Content area */}
            {loading && <LoadingSkeleton />}

            {error && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Verse unavailable — open a Bible app to read this passage.
              </p>
            )}

            {verse && !loading && (
              <>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.72,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{verse.text}&rdquo;
                </p>
                {verse.truncated && (
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 8,
                      marginBottom: 0,
                    }}
                  >
                    (showing first verse only)
                  </p>
                )}
              </>
            )}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

function LoadingSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        className="animate-pulse"
        style={{
          height: 12,
          borderRadius: 6,
          background: "rgba(255,255,255,0.08)",
          width: "100%",
        }}
      />
      <div
        className="animate-pulse"
        style={{
          height: 12,
          borderRadius: 6,
          background: "rgba(255,255,255,0.08)",
          width: "72%",
        }}
      />
    </div>
  )
}
