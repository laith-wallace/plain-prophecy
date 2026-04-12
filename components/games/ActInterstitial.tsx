"use client";

interface ActInterstitialProps {
  actLabel: string;
  actColor: string;
  actNumber: number;
  totalActs: number;
  xpEarned: number;
  onContinue: () => void;
}

export function ActInterstitial({
  actLabel,
  actColor,
  actNumber,
  totalActs,
  xpEarned,
  onContinue,
}: ActInterstitialProps) {
  return (
    <div className="act-interstitial">
      <div className="act-interstitial-eyebrow" style={{ color: actColor }}>
        Act {actNumber} of {totalActs} complete
      </div>
      <h2 className="act-interstitial-title">{actLabel}</h2>
      {xpEarned > 0 && (
        <div className="act-interstitial-xp">+{xpEarned} XP earned this act</div>
      )}
      <div className="act-interstitial-divider" style={{ background: actColor }} />
      <button
        className="act-interstitial-btn"
        onClick={onContinue}
        style={{ borderColor: actColor, color: actColor }}
        autoFocus
      >
        Continue →
      </button>
    </div>
  );
}
