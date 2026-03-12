import GospelPlaceholder from "@/components/studies/GospelPlaceholder";

export default function RighteousnessByFaithPage() {
  const svgMotif = (
    <svg 
      width="160" 
      height="160" 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      {/* Base / Fulcrum */}
      <path d="M80 140L60 140L80 60L100 140L80 140Z" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Tilted Beam */}
      <line x1="30" y1="75" x2="130" y2="45" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Left String & Pan (Heavy side with small cross inside) */}
      <line x1="30" y1="75" x2="15" y2="115" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="75" x2="45" y2="115" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 115C15 125 45 125 45 115Z" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small cross on left side acting as heavy weight */}
      <path d="M30 100v10M25 103h10" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Right String & Pan (Lighter but larger) */}
      <line x1="130" y1="45" x2="115" y2="85" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="45" x2="145" y2="85" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M115 85C115 95 145 95 145 85Z" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Random larger shapes representing works on right side */}
      <rect x="122" y="70" width="8" height="12" stroke="#C9A84C" strokeWidth="1.5" />
      <circle cx="134" cy="76" r="4" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
  );

  return (
    <GospelPlaceholder
      eyebrow="The Gospel · Coming Soon"
      title={
        <>
          Righteousness You <span className="text-[#C9A84C]">Didn&apos;t Earn</span>
        </>
      }
      subtitle="The most counterintuitive idea in the Bible — and the one everything else depends on."
      bodyText="This study works through what Paul means by righteousness by faith in Romans and Galatians. We'll trace the thread from Abraham to the Cross — why God has always justified by faith, never by works, and what that means for how we relate to him today."
      anchorVerse={<>&quot;Abraham believed God, and it was counted to him as righteousness.&quot; — Romans 4:3</>}
      svgMotif={svgMotif}
    />
  );
}
