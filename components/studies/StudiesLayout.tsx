"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

// ── Inner nav — inside the SidebarProvider tree
function StudiesNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, toggleSidebar } = useSidebar();
  const [expandedBooks, setExpandedBooks] = useState<string[]>(
    studyBooks.map((b) => b.slug)
  );

  const toggleBook = (slug: string) => {
    setExpandedBooks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  /** If sidebar is collapsed (icon rail), clicking a book icon expands the sidebar.
   *  If already open, it toggles the book section as normal. */
  const handleBookClick = (slug: string) => {
    if (!open) {
      toggleSidebar();
      // Ensure the clicked book is expanded when the sidebar opens
      setExpandedBooks((prev) =>
        prev.includes(slug) ? prev : [...prev, slug]
      );
    } else {
      toggleBook(slug);
    }
  };

  return (
    <>
      <SidebarHeader className="studies-sb-header">
        {/* In expanded mode: brand + trigger side by side */}
        <div className="studies-sb-brand-row">
          <div className="studies-sb-brand">
            <span className="studies-sb-eyebrow">Plain Prophecy</span>
            <span className="studies-sb-title">Bible Books</span>
          </div>
          <SidebarTrigger className="studies-sb-trigger" aria-label="Toggle sidebar" />
        </div>
        {/* In collapsed icon mode: just the trigger, centred */}
        <SidebarTrigger className="studies-sb-trigger-icon-only" aria-label="Toggle sidebar" />
      </SidebarHeader>

      <SidebarContent className="studies-sb-content">
        <nav className="studies-nav">
          {studyBooks.map((book) => {
            const isExpanded = expandedBooks.includes(book.slug);
            const bookActive = pathname.startsWith(`/studies/${book.slug}`);

            return (
              <div key={book.slug} className="studies-sb-book-section">
                {/* Book toggle — shows as icon in collapsed mode */}
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={bookActive}
                      tooltip={book.title}
                      className="studies-book-btn"
                      onClick={() => handleBookClick(book.slug)}
                    >
                      {/* Icon slot — visible in both expanded and collapsed */}
                      <span className="studies-book-icon-24" aria-hidden="true">{book.icon}</span>
                      {/* Text — hidden in collapsed icon mode via shadcn's truncate */}
                      <span className="studies-book-label">
                        {book.title}
                        <span className={`studies-book-chevron ${isExpanded ? "studies-book-chevron--open" : ""}`}>›</span>
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>

                {/* Lesson links — hidden in collapsed mode */}
                {isExpanded && (
                  <SidebarMenu className="studies-lessons-list">
                    {book.lessons.map((lesson) => {
                      const href = `/studies/${book.slug}/${lesson.slug}`;
                      const isActive = pathname === href;
                      return (
                        <SidebarMenuItem key={lesson.slug} className="studies-lesson-item">
                          <Link
                            href={href}
                            className={`studies-lesson-link ${isActive ? "studies-lesson-link--active" : ""}`}
                          >
                            <span className="studies-lesson-dot" aria-hidden="true">·</span>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Studies Home"
              isActive={pathname === "/studies"}
              className="studies-book-btn"
              onClick={() => router.push("/studies")}
            >
              <span className="studies-book-icon-24" aria-hidden="true">🏠</span>
              <span className="studies-book-label studies-sidebar-footer-text">Studies Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <span className="studies-sb-coming-soon studies-sidebar-footer-text">More books coming soon</span>
      </SidebarFooter>

    </>
  );
}

// ── Main layout
interface StudiesLayoutProps {
  children: React.ReactNode;
  defaultSidebarOpen?: boolean;
  /** "icon" for lesson pages (collapses to 56px icon rail), "offcanvas" for index (slides fully off) */
  collapsibleMode?: "icon" | "offcanvas";
}

export default function StudiesLayout({
  children,
  defaultSidebarOpen = true,
  collapsibleMode = "icon",
}: StudiesLayoutProps) {
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen} className="studies-root">
      <Sidebar
        className="studies-sidebar-shadcn"
        collapsible={collapsibleMode}
      >
        <StudiesNav />
      </Sidebar>

      <main className="studies-content studies-content--with-sidebar">
        {children}
      </main>
    </SidebarProvider>
  );
}
