"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { studyBooks } from "@/data/studies";

export default function StudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedBooks, setExpandedBooks] = useState<string[]>([
    ...studyBooks.map((b) => b.slug),
  ]);

  const toggleBook = (slug: string) => {
    setExpandedBooks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="studies-root">
      {/* Mobile top bar */}
      <div className="studies-mobile-bar">
        <button
          className="studies-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle study navigation"
        >
          <span>{sidebarOpen ? "✕" : "☰"}</span>
          <span className="studies-mobile-label">Studies</span>
        </button>

        {/* Active lesson breadcrumb on mobile */}
        <span className="studies-mobile-crumb">
          {studyBooks
            .flatMap((b) =>
              b.lessons.map((l) => ({
                href: `/studies/${b.slug}/${l.slug}`,
                title: l.title,
                bookTitle: b.title,
              }))
            )
            .find((l) => l.href === pathname)?.title ?? "Select a study"}
        </span>
      </div>

      <div className="studies-shell">
        {/* Sidebar */}
        <aside
          className={`studies-sidebar ${sidebarOpen ? "studies-sidebar--open" : ""}`}
        >
          <div className="studies-sidebar-inner">
            {/* Header */}
            <div className="studies-sidebar-header">
              <div className="studies-sidebar-eyebrow">Studies</div>
              <div className="studies-sidebar-title">Bible Books</div>
            </div>

            {/* Book navigation */}
            <nav className="studies-nav">
              {studyBooks.map((book) => {
                const isExpanded = expandedBooks.includes(book.slug);
                const bookActive = pathname.startsWith(`/studies/${book.slug}`);

                return (
                  <div key={book.slug} className="studies-book-group">
                    {/* Book header (collapsible) */}
                    <button
                      className={`studies-book-toggle ${bookActive ? "studies-book-toggle--active" : ""}`}
                      onClick={() => toggleBook(book.slug)}
                      aria-expanded={isExpanded}
                    >
                      <span className="studies-book-icon">{book.icon}</span>
                      <span className="studies-book-name">{book.title}</span>
                      <span
                        className={`studies-book-chevron ${isExpanded ? "studies-book-chevron--open" : ""}`}
                      >
                        ›
                      </span>
                    </button>

                    {/* Lessons list */}
                    {isExpanded && (
                      <ul className="studies-lessons-list">
                        {book.lessons.map((lesson) => {
                          const href = `/studies/${book.slug}/${lesson.slug}`;
                          const isActive = pathname === href;

                          return (
                            <li key={lesson.slug}>
                              <Link
                                href={href}
                                className={`studies-lesson-link ${isActive ? "studies-lesson-link--active" : ""}`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <span className="studies-lesson-dot">·</span>
                                <span>{lesson.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer note */}
            <div className="studies-sidebar-footer">
              <div className="studies-sidebar-footer-text">
                More books coming soon
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="studies-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className="studies-content">{children}</main>
      </div>
    </div>
  );
}
