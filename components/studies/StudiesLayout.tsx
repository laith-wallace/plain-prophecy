"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
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
  const booksData = useQuery(api.studyCourses.getAllWithLessons);
  const studyBooks = booksData ?? [];
  const [expandedBooks, setExpandedBooks] = useState<string[]>([]);

  // Expand all books once data loads (runs once when data arrives)
  React.useEffect(() => {
    if (booksData && expandedBooks.length === 0) {
      setExpandedBooks(booksData.map((b) => b.slug));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksData]);

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
          <button
            className="studies-sb-trigger"
            aria-label="Toggle sidebar"
            onClick={() => toggleSidebar()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
        </div>
        {/* In collapsed icon mode: just the trigger, centred */}
        <button
          className="studies-sb-trigger-icon-only"
          aria-label="Toggle sidebar"
          onClick={() => toggleSidebar()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </SidebarHeader>

      <SidebarContent className="studies-sb-content">
        <nav className="studies-nav">
          {studyBooks.map((book) => {
            const isExpanded = expandedBooks.includes(book.slug);
            const bookActive = pathname.startsWith(`/studies/${book.slug}`);

            return (
              <div key={book.slug} className="studies-sb-book-section">
                {/* Visual Separator if requested */}
                {book.hasSeparator && (
                  <div className="h-[1px] bg-white/10 my-4 mx-4" />
                )}
                
                <SidebarMenu>
                  <SidebarMenuItem>
                    {/* Book toggle — shows as icon in collapsed mode */}
                    <SidebarMenuButton
                      isActive={bookActive}
                      tooltip={book.title}
                      className="studies-book-btn"
                      onClick={() => handleBookClick(book.slug)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="studies-book-icon-24" aria-hidden="true">{book.icon}</span>
                        <span className="studies-book-label">{book.title}</span>
                      </div>
                      <span className={`studies-book-chevron ${isExpanded ? "studies-book-chevron--open" : ""}`}>›</span>
                    </SidebarMenuButton>

                    {/* Lesson links — nested under the Book item */}
                    {isExpanded && (
                      <div className="pl-4 mt-1">
                        <SidebarMenu className="studies-lessons-list border-l border-white/10 ml-[23px]">
                          {book.lessons.map((lesson) => {
                            const href = `/studies/${book.slug}/${lesson.slug}`;
                            const isActive = pathname === href;
                            return (
                              <SidebarMenuItem key={lesson.slug} className="studies-lesson-item ml-[-1px]">
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
                      </div>
                    )}
                  </SidebarMenuItem>
                </SidebarMenu>
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
  const [open, setOpen] = useState(defaultSidebarOpen);

  // When defaultSidebarOpen changes (due to navigation in the parent layout),
  // we force the sidebar to sync with that preference.
  React.useEffect(() => {
    setOpen(defaultSidebarOpen);
  }, [defaultSidebarOpen]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="studies-root">
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
