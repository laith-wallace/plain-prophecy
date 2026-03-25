"use client";

import { useEditor, EditorContent, BubbleMenu, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { common, createLowlight } from "lowlight";
import { useEffect, useRef, useState } from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import styles from "./RichTextEditor.module.css";

const lowlight = createLowlight(common);

// ─── Slash command items ───────────────────────────────────────────────────

interface SlashItem {
  title: string;
  icon: string;
  command: (params: { editor: ReturnType<typeof useEditor>; range: { from: number; to: number } }) => void;
}

const SLASH_ITEMS: SlashItem[] = [
  {
    title: "Text",
    icon: "¶",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    title: "Heading 1",
    icon: "H1",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).setHeading({ level: 1 }).run(),
  },
  {
    title: "Heading 2",
    icon: "H2",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).setHeading({ level: 2 }).run(),
  },
  {
    title: "Heading 3",
    icon: "H3",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).setHeading({ level: 3 }).run(),
  },
  {
    title: "Bullet List",
    icon: "•",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: "Numbered List",
    icon: "1.",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: "Blockquote",
    icon: "❝",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: "Code Block",
    icon: "<>",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Divider",
    icon: "—",
    command: ({ editor, range }) =>
      editor!.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
];

// ─── Slash Command Palette Component ──────────────────────────────────────

interface SlashPaletteProps {
  items: SlashItem[];
  command: (item: SlashItem) => void;
}

function SlashPalette({ items, command }: SlashPaletteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i === 0 ? items.length - 1 : i - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i === items.length - 1 ? 0 : i + 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (items[selectedIndex]) command(items[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [items, selectedIndex, command]);

  if (!items.length) return null;

  return (
    <div className="bg-stone-900 border border-stone-700 rounded-xl shadow-2xl shadow-black/60 w-64 max-h-72 overflow-y-auto p-1.5">
      {items.map((item, index) => (
        <button
          key={item.title}
          onClick={() => command(item)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors ${
            index === selectedIndex
              ? "bg-amber-600/15 text-amber-300"
              : "text-stone-300 hover:bg-stone-800 hover:text-stone-100"
          }`}
        >
          <span className="w-6 text-center font-mono text-xs shrink-0 text-stone-500">{item.icon}</span>
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Slash Command Extension ───────────────────────────────────────────────

// We keep a ref to the tippy instance and ReactRenderer outside the component
// because Suggestion callbacks are created once per editor instance.
let slashPopup: TippyInstance[] | null = null;
let slashRenderer: ReactRenderer | null = null;

const SlashCommand = Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({
          editor,
          range,
          props,
        }: {
          editor: ReturnType<typeof useEditor>;
          range: { from: number; to: number };
          props: SlashItem;
        }) => {
          props.command({ editor, range });
        },
        items: ({ query }: { query: string }) => {
          return SLASH_ITEMS.filter((item) =>
            item.title.toLowerCase().startsWith(query.toLowerCase())
          );
        },
        render: () => {
          return {
            onStart: (props: { editor: ReturnType<typeof useEditor>; clientRect?: (() => DOMRect | null) | null; items: SlashItem[]; command: (item: SlashItem) => void }) => {
              slashRenderer = new ReactRenderer(SlashPalette, {
                props: { items: props.items, command: props.command },
                editor: props.editor as Parameters<typeof ReactRenderer>[1]["editor"],
              });

              if (!props.clientRect) return;

              slashPopup = tippy("body", {
                getReferenceClientRect: props.clientRect as () => DOMRect,
                appendTo: () => document.body,
                content: slashRenderer.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                theme: "slash",
              });
            },

            onUpdate: (props: { items: SlashItem[]; command: (item: SlashItem) => void; clientRect?: (() => DOMRect | null) | null }) => {
              slashRenderer?.updateProps({ items: props.items, command: props.command });
              if (!props.clientRect) return;
              slashPopup?.[0]?.setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect,
              });
            },

            onKeyDown: (props: { event: KeyboardEvent }) => {
              if (props.event.key === "Escape") {
                slashPopup?.[0]?.hide();
                return true;
              }
              return false;
            },

            onExit: () => {
              slashPopup?.[0]?.destroy();
              slashRenderer?.destroy();
              slashPopup = null;
              slashRenderer = null;
            },
          };
        },
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

// ─── Main Component ────────────────────────────────────────────────────────

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      SlashCommand,
    ],
    content: content ?? undefined,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

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
    const existing = editor.getAttributes("link").href ?? "";
    setLinkUrl(existing);
    setShowLinkInput((prev) => !prev);
  }

  if (!mounted) return null;

  const isInCodeBlock = editor?.isActive("codeBlock") ?? false;

  return (
    <div className={styles.editor}>
      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, placement: "top-start" }}
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
                <span className="font-mono text-xs">{"`"}</span>
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

// ─── Bubble Menu Button ────────────────────────────────────────────────────

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
