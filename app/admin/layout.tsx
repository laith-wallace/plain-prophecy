import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { Toaster } from "@/components/ui/sonner";
import { AdminUnsavedProvider } from "@/context/AdminUnsavedContext";
import NextTopLoader from "nextjs-toploader";

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
      <div className="flex h-dvh bg-stone-950 text-stone-100 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminTopBar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </AdminUnsavedProvider>
  );
}
