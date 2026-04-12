import { PlayerProvider } from "@/lib/PlayerContext";
import { XPToastStack } from "@/components/games/XPToast";
import { TrophyUnlockOverlay } from "@/components/games/TrophyUnlock";

export default function GospelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      {children}
      <XPToastStack />
      <TrophyUnlockOverlay />
    </PlayerProvider>
  );
}
