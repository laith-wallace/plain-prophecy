import { useEffect } from "react";
import { useAdminUnsaved } from "@/context/AdminUnsavedContext";

export function useUnsavedChanges(isDirty: boolean) {
  const { setIsDirty } = useAdminUnsaved();

  // Sync local isDirty into global context
  useEffect(() => {
    setIsDirty(isDirty);
    return () => setIsDirty(false);
  }, [isDirty, setIsDirty]);

  // Warn on browser/tab close
  useEffect(() => {
    if (!isDirty) return;
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
}
