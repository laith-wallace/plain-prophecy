import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { Toaster } from "@/components/ui/sonner";
import { AdminUnsavedProvider } from "@/context/AdminUnsavedContext";
import NextTopLoader from "nextjs-toploader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminUnsavedProvider>
      <NextTopLoader 
        color="#f59e0b"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #f59e0b,0 0 5px #f59e0b"
      />
      <SidebarProvider
        style={{
          "--sidebar-width": "14rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties}
      >
        <div className="flex h-dvh bg-stone-950 text-stone-100 overflow-hidden w-full">
          <AdminSidebar />
          <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden bg-stone-950 border-none">
            <AdminTopBar />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </AdminUnsavedProvider>
  );
}
