"use client";

import { usePlayer, type XPToastItem } from "@/lib/PlayerContext";

export function XPToastStack() {
  const { xpToasts, dismissXPToast } = usePlayer();

  if (xpToasts.length === 0) return null;

  return (
    <div className="xp-toast-stack" aria-live="polite">
      {xpToasts.map((toast) => (
        <XPToastItem key={toast.id} toast={toast} onDone={dismissXPToast} />
      ))}
    </div>
  );
}

function XPToastItem({
  toast,
  onDone,
}: {
  toast: XPToastItem;
  onDone: (id: number) => void;
}) {
  return (
    <div
      className="xp-toast"
      onAnimationEnd={() => onDone(toast.id)}
    >
      <span className="xp-toast-amount">+{toast.amount} XP</span>
      <span className="xp-toast-label">{toast.label}</span>
    </div>
  );
}
