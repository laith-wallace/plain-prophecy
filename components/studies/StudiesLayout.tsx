"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studyBooks } from "@/data/studies";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// ── Inner nav — inside the SidebarProvider tree
function StudiesNav() {
  const pathname = usePathname();
  const [expandedBooks, setExpandedBooks] = useState<string[]>(
    studyBooks.map((b) => b.slug)
  );

  const toggleBook = (slug: string) => {
    setExpandedBooks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <>
      <SidebarHeader className="studies-sb-header">
        <div className="studies-sb-brand">
          <span className="studies-sb-eyebrow">Plain Prophecy</span>
          <span className="studies-sb-title">Bible Books</span>
        </div>
        {/* Notion-style collapse trigger */}
        <SidebarTrigger className="studies-sb-trigger" aria-label="Toggle sidebar" />
      </SidebarHeader>

      <SidebarContent className="studies-sb-content">
        <nav className="studies-nav">
          {studyBooks.map((book) => {
            const isExpanded = expandedBooks.includes(book.slug);
            const bookActive = pathname.startsWith(`/studies/${book.slug}`);

            return (
              <div key={book.slug} className="studies-book-group">
                {/* Book header */}
                <button
                  className={`studies-book-toggle ${bookActive ? "studies-book-toggle--active" : ""}`}
                  onClick={() => toggleBook(book.slug)}
                  aria-expanded={isExpanded}
                >
                  <span className="studies-book-icon">{book.icon}</span>
                  <span className="studies-book-name">{book.title}</span>
                  <span className={`studies-book-chevron ${isExpanded ? "studies-book-chevron--open" : ""}`}>
                    ›
                  </span>
                </button>

                {/* Lesson links */}
                {isExpanded && (
                  <SidebarMenu className="studies-lessons-list">
                    {book.lessons.map((lesson) => {
                      const href = `/studies/${book.slug}/${lesson.slug}`;
                      const isActive = pathname === href;
                      return (
                        <SidebarMenuItem key={lesson.slug}>
                          <Link
                            href={href}
                            className={`studies-lesson-link ${isActive ? "studies-lesson-link--active" : ""}`}
                          >
                            <span className="studies-lesson-dot">·</span>
                            <span>{lesson.title}</span>
                          </Link>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                )}
              </div>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter className="studies-sb-footer">
        <span className="studies-sidebar-footer-text">More books coming soon</span>
      </SidebarFooter>
    </>
  );
}

// ── Main layout
interface StudiesLayoutProps {
  children: React.ReactNode;
  defaultSidebarOpen?: boolean;
}

export default function StudiesLayout({
  children,
  defaultSidebarOpen = true,
}: StudiesLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen} className="studies-root">
      <Sidebar className="studies-sidebar-shadcn" collapsible="offcanvas">
        <StudiesNav />
      </Sidebar>

      <main className="studies-content studies-content--with-sidebar">
        {children}
      </main>
    </SidebarProvider>
  );
}
