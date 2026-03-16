"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAdminUnsaved } from "@/context/AdminUnsavedContext";
import UnsavedBadge from "@/components/admin/UnsavedBadge";

export default function AdminTopBar({ title }: { title?: string }) {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { isDirty } = useAdminUnsaved();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
  }

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-6 border-b border-stone-800 bg-stone-950">
      {title && (
        <h1 className="text-sm font-medium text-stone-200">{title}</h1>
      )}
      <div className="ml-auto flex items-center gap-4">
        <UnsavedBadge show={isDirty} />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </header>
  );
}
