"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Extension } from "@tiptap/core";
import { Suggestion } from "@tiptap/suggestion";
import { common, createLowlight } from "lowlight";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./RichTextEditor.module.css";

const lowlight = createLowlight(common);

// ─── Slash command item type ───────────────────────────────────────────────

interface SlashItem {
  title: string;
  icon: string;
  command: (params: { editor: unknown; range: { from: number; to: number } }) => void;
}

const SLASH_ITEMS: SlashItem[] = [
  {
    title: "Text",
    icon: "¶",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    title: "Heading 1",
    icon: "H1",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    icon: "H2",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    title: "Heading 3",
    icon: "H3",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    title: "Bullet List",
    icon: "•",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: "Numbered List",
    icon: "1.",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: "Blockquote",
    icon: "❝",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: "Code Block",
    icon: "<>",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Divider",
    icon: "—",
    command: ({ editor, range }) =>
      (editor as ReturnType<typeof useEditor>)!
        .chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
];

// ─── Slash Palette (pure React portal) ────────────────────────────────────

interface SlashPaletteProps {
  items: SlashItem[];
  onSelect: (item: SlashItem) => void;
  position: { top: number; left: number };
}

function SlashPalette({ items, onSelect, position }: SlashPaletteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((i) => (i === 0 ? items.length - 1 : i - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((i) => (i === items.length - 1 ? 0 : i + 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (items[selectedIndex]) onSelect(items[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [items, selectedIndex, onSelect]);

  if (!items.length) return null;

  return createPortal(
    <div
      style={{ position: "fixed", top: position.top, left: position.left, zIndex: 9999 }}
    >
      <div className="bg-stone-900 border border-stone-700 rounded-xl shadow-2xl shadow-black/60 w-64 max-h-72 overflow-y-auto p-1.5">
        {items.map((item, index) => (
          <button
            key={item.title}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
              index === selectedIndex
                ? "bg-amber-600/15 text-amber-300"
                : "text-stone-300 hover:bg-stone-800 hover:text-stone-100"
            }`}
          >
            <span className="w-6 text-center font-mono text-xs shrink-0 text-stone-500">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

// ─── Bridge: suggestion extension → React state ───────────────────────────

interface SlashBridge {
  show: (items: SlashItem[], rect: DOMRect, selectFn: (item: SlashItem) => void) => void;
  update: (items: SlashItem[], rect: DOMRect, selectFn: (item: SlashItem) => void) => void;
  hide: () => void;
}

let slashBridge: SlashBridge | null = null;

function buildSlashExtension() {
  return Extension.create({
    name: "slashCommand",

    addOptions() {
      return {
        suggestion: {
          char: "/",
          startOfLine: false,
          allowSpaces: false,
          command: ({
            editor,
            range,
            props,
          }: {
            editor: unknown;
            range: { from: number; to: number };
            props: SlashItem;
          }) => {
            props.command({ editor, range });
          },
          items: ({ query }: { query: string }) =>
            SLASH_ITEMS.filter((item) =>
              item.title.toLowerCase().startsWith(query.toLowerCase())
            ),
          render: () => ({
            onStart: (props: {
              items: SlashItem[];
              clientRect?: (() => DOMRect | null) | null;
              command: (item: SlashItem) => void;
            }) => {
              const rect = props.clientRect?.();
              if (!rect || !slashBridge) return;
              slashBridge.show(props.items, rect, props.command);
            },
            onUpdate: (props: {
              items: SlashItem[];
              clientRect?: (() => DOMRect | null) | null;
              command: (item: SlashItem) => void;
            }) => {
              const rect = props.clientRect?.();
              if (!rect || !slashBridge) return;
              slashBridge.update(props.items, rect, props.command);
            },
            onKeyDown: ({ event }: { event: KeyboardEvent }) => {
              if (event.key === "Escape") {
                slashBridge?.hide();
                return true;
              }
              if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
                return true;
              }
              return false;
            },
            onExit: () => {
              slashBridge?.hide();
            },
          }),
        },
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          ...this.options.suggestion,
        }),
      ];
    },
  });
}

// ─── Main component ────────────────────────────────────────────────────────

interface RichTextEditorProps {
  content: object | null;
  onChange: (json: object) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing, or press / for commands…",
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);
  // Keep a stable ref to onChange so the useEditor closure never goes stale
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Slash palette state
  const [slashVisible, setSlashVisible] = useState(false);
  const [slashItems, setSlashItems] = useState<SlashItem[]>([]);
  const [slashPosition, setSlashPosition] = useState({ top: 0, left: 0 });
  const slashSelectRef = useRef<((item: SlashItem) => void) | null>(null);

  // Register the bridge so the extension can drive React state
  useEffect(() => {
    slashBridge = {
      show: (items, rect, selectFn) => {
        setSlashItems(items);
        setSlashPosition({ top: rect.bottom + 4, left: rect.left });
        slashSelectRef.current = selectFn;
        setSlashVisible(true);
      },
      update: (items, rect, selectFn) => {
        setSlashItems(items);
        setSlashPosition({ top: rect.bottom + 4, left: rect.left });
        slashSelectRef.current = selectFn;
      },
      hide: () => {
        setSlashVisible(false);
        setSlashItems([]);
        slashSelectRef.current = null;
      },
    };
    return () => {
      slashBridge = null;
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const SlashCommandExtension = useRef(buildSlashExtension()).current;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      TextStyle,
      Color,
      CodeBlockLowlight.configure({ lowlight }),
      Link.configure({ openOnClick: false }),
      Image,
      SlashCommandExtension,
    ],
    content: content ?? undefined,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChangeRef.current(editor.getJSON());
    },
    onCreate: () => {
      // Small delay to ensure content is set if it was passed initially
      if (content) {
        // useEditor already handles initial content, but this ensures it's set if useEditor missed it
      }
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  // Handle external content updates (e.g. from the database after component mount)
  useEffect(() => {
    if (editor && content) {
      const currentJSON = editor.getJSON();
      // Only update if the content is truly different (and we are not in an onUpdate loop)
      if (JSON.stringify(currentJSON) !== JSON.stringify(content)) {
        // @ts-expect-error - setContent signature can vary by Tiptap version
        editor.commands.setContent(content, false);
      }
    }
  }, [content, editor]);

  // Focus link input when shown
  useEffect(() => {
    if (showLinkInput) {
      setTimeout(() => linkInputRef.current?.focus(), 50);
    }
  }, [showLinkInput]);

  function handleSetLink() {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  }

  function handleLinkButtonClick() {
    if (!editor) return;
    const existing = (editor.getAttributes("link").href as string) ?? "";
    setLinkUrl(existing);
    setShowLinkInput((prev) => !prev);
  }

  function handleSlashSelect(item: SlashItem) {
    setSlashVisible(false);
    slashSelectRef.current?.(item);
  }

  if (!mounted) return null;

  return (
    <div className={styles.editor}>
      {/* Slash palette portal */}
      {slashVisible && (
        <SlashPalette
          items={slashItems}
          onSelect={handleSlashSelect}
          position={slashPosition}
        />
      )}

      {/* Bubble menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, state }) => {
            const { from, to } = state.selection;
            if (from === to) return false;
            if (editor.isActive("codeBlock")) return false;
            return true;
          }}
        >
          <div className="relative">
            <div className="bg-stone-900 border border-stone-700 rounded-lg shadow-xl shadow-black/50 flex items-center gap-0.5 p-1">
              <BubbleButton
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold (⌘B)"
              >
                <strong>B</strong>
              </BubbleButton>
              <BubbleButton
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic (⌘I)"
              >
                <em>I</em>
              </BubbleButton>
              <BubbleButton
                active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title="Underline (⌘U)"
              >
                <span style={{ textDecoration: "underline" }}>U</span>
              </BubbleButton>
              <BubbleButton
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strikethrough (⌘⇧S)"
              >
                <span style={{ textDecoration: "line-through" }}>S</span>
              </BubbleButton>
              <BubbleButton
                active={editor.isActive("code")}
                onClick={() => editor.chain().focus().toggleCode().run()}
                title="Inline code (⌘E)"
              >
                <span className="font-mono text-xs">`</span>
              </BubbleButton>
              <BubbleButton
                active={editor.isActive("link") || showLinkInput}
                onClick={handleLinkButtonClick}
                title="Link (⌘K)"
              >
                <span className="text-xs">⌘K</span>
              </BubbleButton>
            </div>

            {/* Inline link input */}
            {showLinkInput && (
              <div className="absolute top-full left-0 mt-1 bg-stone-900 border border-stone-700 rounded-lg shadow-xl shadow-black/50 p-1.5 flex items-center gap-1.5 w-72">
                <input
                  ref={linkInputRef}
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSetLink();
                    if (e.key === "Escape") {
                      setShowLinkInput(false);
                      setLinkUrl("");
                    }
                  }}
                  placeholder="https://..."
                  className="flex-1 bg-stone-800 border border-stone-700 text-stone-100 placeholder:text-stone-600 text-xs rounded px-2 py-1 outline-none focus:ring-1 focus:ring-amber-600"
                />
                <button
                  onClick={handleSetLink}
                  className="px-2.5 py-1 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors"
                >
                  Set
                </button>
                {editor.isActive("link") && (
                  <button
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                      setShowLinkInput(false);
                      setLinkUrl("");
                    }}
                    className="px-2 py-1 text-xs text-stone-400 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}

// ─── Bubble button ─────────────────────────────────────────────────────────

function BubbleButton({
  children,
  active,
  onClick,
  title,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={`px-2.5 py-1 text-xs rounded transition-colors ${
        active
          ? "bg-amber-600/20 text-amber-400"
          : "text-stone-300 hover:bg-stone-700 hover:text-stone-100"
      }`}
    >
      {children}
    </button>
  );
}
