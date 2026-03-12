import GospelPlaceholder from "@/components/studies/GospelPlaceholder";

export default function TheResurrectionPage() {
  const svgMotif = (
    <svg 
      width="160" 
      height="160" 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      {/* Horizon Line */}
      <line x1="20" y1="120" x2="140" y2="120" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Semicircle Sunrise */}
      <path d="M50 120 A 30 30 0 0 1 110 120" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Radiating Rays */}
      <line x1="80" y1="80" x2="80" y2="50" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="108" y1="92" x2="130" y2="70" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="92" x2="30" y2="70" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="110" x2="140" y2="100" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="110" x2="20" y2="100" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <GospelPlaceholder
      eyebrow="The Gospel · Coming Soon"
      title={
        <>
          The Day That <span className="text-[#C9A84C]">Changed Everything</span>
        </>
      }
      subtitle="If the resurrection didn't happen, none of this matters. If it did — nothing is the same."
      bodyText="This study examines the historical and theological case for the resurrection of Jesus. We'll look at the evidence, the eyewitness accounts, the empty tomb, and what Paul means when he says the resurrection is the cornerstone of everything we believe (1 Cor 15)."
      anchorVerse={<>&quot;If Christ has not been raised, your faith is futile... But in fact Christ has been raised from the dead.&quot; — 1 Corinthians 15:17,20</>}
      svgMotif={svgMotif}
    />
  );
}
