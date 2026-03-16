export default function UnsavedBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-amber-400">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      Unsaved changes
    </div>
  );
}
