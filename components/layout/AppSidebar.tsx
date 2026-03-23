"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Scale,
  GraduationCap,
  Gamepad2,
  Info,
  Settings,
  LogOut,
  ChevronUp,
  ChevronDown,
  Home,
  FileText,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const exploreLinks = [
  { href: "/studies/map", label: "Map", icon: Map },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/compare", label: "Compare", icon: Scale },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/games", label: "Games", icon: Gamepad2 },
];

const accountLinks = [
  { href: "/profile/settings", label: "Profile Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const user = useQuery(api.users.viewer);
  const booksData = useQuery(api.studyCourses.getAllWithLessons);
  const { signOut } = useAuthActions();

  const onStudiesRoute = pathname.startsWith("/studies") &&
    pathname !== "/studies/map" &&
    pathname !== "/studies/timeline" &&
    pathname !== "/studies/empire-map";

  const [studiesOpen, setStudiesOpen] = useState(onStudiesRoute);
  const [expandedBooks, setExpandedBooks] = useState<string[]>([]);

  // Auto-expand subnav when navigating to a studies route
  useEffect(() => {
    if (onStudiesRoute) setStudiesOpen(true);
  }, [onStudiesRoute]);

  // Auto-expand the active book
  useEffect(() => {
    if (!booksData) return;
    const activeBook = booksData.find((b) => pathname.startsWith(`/studies/${b.slug}`));
    if (activeBook && !expandedBooks.includes(activeBook.slug)) {
      setExpandedBooks((prev) => [...prev, activeBook.slug]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, booksData]);

  const toggleBook = (slug: string) => {
    setExpandedBooks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isActive = (href: string) =>
    href === "/profile"
      ? pathname === "/profile"
      : pathname === href || (href !== "/" && pathname.startsWith(href));

  const firstName = user?.name?.split(" ")[0] || "Seeker";
  const initial = user?.name?.[0] || user?.email?.[0] || "S";

  return (
    <Sidebar
      collapsible="icon"
      style={
        {
          background: "#0e0b09",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          "--sidebar-background": "#0e0b09",
          "--sidebar-foreground": "rgba(200,195,190,1)",
          "--sidebar-border": "rgba(255,255,255,0.08)",
          "--sidebar-accent": "rgba(232,160,32,0.12)",
          "--sidebar-accent-foreground": "#e8a020",
          "--sidebar-primary": "#e8a020",
          "--sidebar-primary-foreground": "#0e0b09",
          "--sidebar-ring": "#e8a020",
        } as React.CSSProperties
      }
    >
      {/* Header — Logo + Collapse toggle */}
      <SidebarHeader className="flex-row items-center justify-between px-3 py-3">
        {/* Logo — hidden in icon-only mode */}
        <Link
          href="/profile"
          className="flex items-center group-data-[collapsible=icon]:hidden"
        >
          <Image
            src="/plain-prophecy-logo.svg"
            alt="Plain Prophecy"
            width={120}
            height={24}
            style={{ height: 18, width: "auto", opacity: 0.9 }}
          />
        </Link>

        {/* Explicit collapse / expand toggle */}
        <SidebarTrigger
          className="ml-auto shrink-0"
          style={{ color: "rgba(255,255,255,0.45)" }}
        />
      </SidebarHeader>

      {/* Main nav */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Explore
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Overview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/profile" />}
                  isActive={isActive("/profile")}
                  tooltip="Overview"
                  style={
                    isActive("/profile")
                      ? { color: "#e8a020", background: "rgba(232,160,32,0.1)" }
                      : { color: "rgba(255,255,255,0.65)" }
                  }
                >
                  <LayoutDashboard size={16} />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Studies — collapsible subnav */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setStudiesOpen((v) => !v)}
                  isActive={onStudiesRoute}
                  tooltip="Studies"
                  style={
                    onStudiesRoute
                      ? { color: "#e8a020", background: "rgba(232,160,32,0.1)" }
                      : { color: "rgba(255,255,255,0.65)" }
                  }
                >
                  <BookOpen size={16} />
                  <span>Studies</span>
                  <ChevronDown
                    size={12}
                    className="ml-auto"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      transform: studiesOpen ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </SidebarMenuButton>

                <AnimatePresence initial={false}>
                  {studiesOpen && (
                    <motion.div
                      key="studies-sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <SidebarMenuSub>
                        {/* Studies Home */}
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            render={<Link href="/studies" />}
                            isActive={pathname === "/studies"}
                            style={
                              pathname === "/studies"
                                ? { color: "#e8a020" }
                                : { color: "rgba(255,255,255,0.6)" }
                            }
                          >
                            <Home size={12} />
                            <span>Studies Home</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                        {/* Books from Convex — each expandable to show lessons */}
                        {booksData?.map((book) => {
                          const bookActive = pathname.startsWith(`/studies/${book.slug}`);
                          const bookExpanded = expandedBooks.includes(book.slug);
                          return (
                            <SidebarMenuSubItem key={book.slug}>
                              {/* Book header — click to toggle lessons */}
                              <SidebarMenuSubButton
                                onClick={() => toggleBook(book.slug)}
                                isActive={bookActive}
                                style={
                                  bookActive
                                    ? { color: "#e8a020" }
                                    : { color: "rgba(255,255,255,0.6)" }
                                }
                              >
                                <span style={{ fontSize: "0.85em" }}>{book.icon}</span>
                                <span className="flex-1">{book.title}</span>
                                <ChevronDown
                                  size={10}
                                  style={{
                                    flexShrink: 0,
                                    color: "rgba(255,255,255,0.3)",
                                    transform: bookExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                                    transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
                                  }}
                                />
                              </SidebarMenuSubButton>

                              {/* Lessons list */}
                              <AnimatePresence initial={false}>
                                {bookExpanded && book.lessons.length > 0 && (
                                  <motion.div
                                    key={`lessons-${book.slug}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <div
                                      style={{
                                        marginLeft: "1.25rem",
                                        borderLeft: "1px solid rgba(255,255,255,0.08)",
                                        paddingLeft: "0.5rem",
                                        paddingTop: "0.125rem",
                                        paddingBottom: "0.125rem",
                                      }}
                                    >
                                      {book.lessons.map((lesson) => {
                                        const lessonHref = `/studies/${book.slug}/${lesson.slug}`;
                                        const lessonActive = pathname === lessonHref;
                                        return (
                                          <Link
                                            key={lesson.slug}
                                            href={lessonHref}
                                            style={{
                                              display: "block",
                                              padding: "0.25rem 0.5rem",
                                              fontSize: "0.75rem",
                                              borderRadius: "0.375rem",
                                              color: lessonActive ? "#e8a020" : "rgba(255,255,255,0.5)",
                                              background: lessonActive ? "rgba(232,160,32,0.08)" : "transparent",
                                              textDecoration: "none",
                                            }}
                                          >
                                            {lesson.title}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SidebarMenuItem>

              {/* Remaining explore links (Map, Timeline, Compare, Learn, Games) */}
              {exploreLinks.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={isActive(href)}
                    tooltip={label}
                    style={
                      isActive(href)
                        ? { color: "#e8a020", background: "rgba(232,160,32,0.1)" }
                        : { color: "rgba(255,255,255,0.65)" }
                    }
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountLinks.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={isActive(href)}
                    tooltip={label}
                    style={
                      isActive(href)
                        ? { color: "#e8a020", background: "rgba(232,160,32,0.1)" }
                        : { color: "rgba(255,255,255,0.65)" }
                    }
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — User + Sign Out */}
      <SidebarFooter className="pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {/* Fix: use render prop so DropdownMenuTrigger merges onto the
                  SidebarMenuButton element — avoids nested <button> in <button> */}
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip={firstName}
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  />
                }
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#e8a020",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0e0b09",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      width={28}
                      height={28}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    initial.toUpperCase()
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className="text-xs font-medium truncate"
                    style={{ color: "#fff" }}
                  >
                    {firstName}
                  </span>
                  {user?.email && (
                    <span
                      className="text-[10px] truncate"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {user.email}
                    </span>
                  )}
                </div>
                <ChevronUp
                  size={14}
                  style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-52"
                style={{
                  background: "#1c1917",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                  style={{ color: "#f87171" }}
                >
                  <LogOut size={14} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
