"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    const headingLines = content.split("\n").filter(line => line.startsWith("#"));
    const tocItems = headingLines.map((line) => {
      const level = line.match(/^#+/)?.[0].length || 0;
      const text = line.replace(/^#+\s*/, "").trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return { id, text, level };
    }).filter(item => item.level > 0 && item.level <= 3);

    setItems(tocItems);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-4">
      <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
        Table of Contents
      </h4>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block transition-colors py-1 border-l-2 pl-3 -ml-px",
                activeId === item.id
                  ? "text-amber-500 border-amber-500 font-medium"
                  : "text-stone-400 border-transparent hover:text-stone-200 hover:border-stone-700"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
