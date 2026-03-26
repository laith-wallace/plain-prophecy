"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Clock,
  GraduationCap,
  Scroll,
  FileText,
  Layers,
  GitCompare,
  PanelLeftIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Evidence Today", href: "/admin/evidence", icon: BookOpen },
  { label: "Doctrines", href: "/admin/doctrines", icon: Map },
  { label: "Pillars", href: "/admin/pillars", icon: Layers },
  { label: "Compare", href: "/admin/compare", icon: GitCompare },
  { label: "Timelines", href: "/admin/timelines", icon: Clock },
  { label: "Studies", href: "/admin/studies", icon: GraduationCap },
  { label: "Prophecies", href: "/admin/prophecies", icon: Scroll },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

function AdminSidebarHeader() {
  const { toggleSidebar } = useSidebar();
  
  return (
    <SidebarHeader className="px-3 py-4 border-b border-stone-800 flex flex-row items-center justify-between min-h-[56px]">
      <div className="group-data-[collapsible=icon]:hidden overflow-hidden whitespace-nowrap">
        <p className="text-[10px] font-bold tracking-widest text-amber-500 uppercase leading-tight">Plain Prophecy</p>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider leading-tight">Admin Console</p>
      </div>
      <Button 
        variant="ghost"
        size="icon-sm"
        onClick={toggleSidebar}
        className="shrink-0 text-stone-400 hover:text-stone-100 hover:bg-stone-800 ml-auto"
        title="Toggle Sidebar"
      >
        <PanelLeftIcon className="size-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </SidebarHeader>
  );
}

export const AdminSidebar = memo(function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar 
      collapsible="icon"
      className="border-r border-stone-800"
      style={{
        "--sidebar-background": "#0c0a09",
        "--sidebar-foreground": "#a8a29e",
        "--sidebar-primary": "#d97706",
        "--sidebar-primary-foreground": "#ffffff",
        "--sidebar-accent": "#292524",
        "--sidebar-accent-foreground": "#fafaf9",
        "--sidebar-border": "#292524",
      } as React.CSSProperties}
    >
      <AdminSidebarHeader />

      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="space-y-0.5">
          {nav.map(({ label, href, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname?.startsWith(href);

            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  render={<Link href={href} />}
                  isActive={active}
                  tooltip={label}
                  className={cn(
                    "transition-colors",
                    active
                      ? "bg-amber-600/15 text-amber-400 hover:bg-amber-600/20 hover:text-amber-400"
                      : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
});

export default AdminSidebar;
