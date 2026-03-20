"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import { search as searchIndex, getSnippet, type SearchDoc } from "@/lib/search";

const TYPE_LABELS: Record<SearchDoc["type"], string> = {
  study: "Study",
  lesson: "Lesson",
  prophecy: "Prophecy",
  doctrine: "Doctrine",
  pillar: "Pillar",
};

const TYPE_ORDER: SearchDoc["type"][] = ["study", "prophecy", "lesson", "doctrine", "pillar"];

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Wrap every occurrence of `term` in the snippet with a <mark> element. */
function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  const token = query.trim().split(/\s+/).filter(Boolean).sort((a, b) => b.length - a.length)[0];
  if (!token) return <>{text}</>;

  const regex = new RegExp(`(${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            style={{
              background: "rgba(232,160,32,0.2)",
              color: "var(--sda-accent, #e8a020)",
              borderRadius: 2,
              padding: "0 1px",
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SearchDialog({ open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const resultsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Global Cmd+K listener
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          window.dispatchEvent(new CustomEvent("open-search"));
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
  }, [open]);

  // Debounced search (150ms)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }
    const id = setTimeout(() => {
      searchIndex(query).then((hits) => {
        setResults(hits);
        setActiveIndex(-1);
      });
    }, 150);
    return () => clearTimeout(id);
  }, [query]);

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABELS[type],
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);

  const flat = grouped.flatMap((g) => g.items);

  const navigate = useCallback(
    (doc: SearchDoc) => {
      onClose();
      router.push(doc.href);
    },
    [onClose, router]
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      navigate(flat[activeIndex]);
    }
  }

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex >= 0) {
      resultsRef.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  let flatIndex = 0;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
          }}
        />
        <Dialog.Popup
          style={{
            position: "fixed",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 201,
            width: "min(640px, calc(100vw - 2rem))",
            background: "#141210",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            overflow: "hidden",
            fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
          }}
        >
          {/* Input row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 1rem",
              borderBottom: results.length > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <Search size={16} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search prophecies, lessons, doctrines…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--paper, #f7f3ec)",
                fontSize: "0.9375rem",
                fontFamily: "inherit",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  fontSize: "1rem",
                  lineHeight: 1,
                  padding: "0 0.25rem",
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <kbd
              style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 4,
                padding: "2px 6px",
                flexShrink: 0,
              }}
            >
              esc
            </kbd>
          </div>

          {/* Results */}
          {grouped.length > 0 && (
            <div style={{ maxHeight: "min(480px, 60dvh)", overflowY: "auto" }}>
              {grouped.map((group) => (
                <div key={group.type}>
                  <div
                    style={{
                      padding: "0.5rem 1rem 0.25rem",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-ibm-plex-mono, monospace)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {group.label}
                  </div>
                  {group.items.map((doc) => {
                    const idx = flatIndex++;
                    const isActive = idx === activeIndex;
                    const snippet = getSnippet(doc.body, query);
                    return (
                      <button
                        key={doc.id}
                        ref={(el) => { resultsRef.current[idx] = el; }}
                        onClick={() => navigate(doc)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.125rem",
                          width: "100%",
                          padding: "0.625rem 1rem",
                          background: isActive ? "rgba(232,160,32,0.1)" : "transparent",
                          border: "none",
                          borderLeft: isActive
                            ? "2px solid var(--sda-accent, #e8a020)"
                            : "2px solid transparent",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.1s, border-color 0.1s",
                        }}
                      >
                        <span
                          style={{
                            color: isActive ? "var(--sda-accent, #e8a020)" : "var(--paper, #f7f3ec)",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: 1.3,
                          }}
                        >
                          {doc.title}
                        </span>
                        <span
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-ibm-plex-mono, monospace)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {doc.label}
                        </span>
                        {snippet && (
                          <span
                            style={{
                              color: "rgba(255,255,255,0.35)",
                              fontSize: "0.75rem",
                              lineHeight: 1.4,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            <HighlightedSnippet text={snippet} query={query} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.trim() && results.length === 0 && (
            <div
              style={{
                padding: "2rem 1rem",
                textAlign: "center",
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.875rem",
              }}
            >
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Footer hint */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              padding: "0.5rem 1rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              ["↑↓", "navigate"],
              ["↵", "open"],
              ["esc", "close"],
            ].map(([key, action]) => (
              <span
                key={action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                }}
              >
                <kbd
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 3,
                    padding: "1px 5px",
                    fontSize: "0.65rem",
                  }}
                >
                  {key}
                </kbd>
                {action}
              </span>
            ))}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
