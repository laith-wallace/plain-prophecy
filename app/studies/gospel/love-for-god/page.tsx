import GospelPlaceholder from "@/components/studies/GospelPlaceholder";

export default function LoveForGodPage() {
  const svgMotif = (
    <svg 
      width="160" 
      height="160" 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      <path 
        d="M80 145C80 145 15.5 101.5 15.5 56.5C15.5 32 35 12.5 59.5 12.5C73.5 12.5 80 23 80 23C80 23 86.5 12.5 100.5 12.5C125 12.5 144.5 32 144.5 56.5C144.5 101.5 80 145 80 145Z" 
        stroke="#C9A84C" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Radiating lines */}
      <line x1="80" y1="4" x2="80" y2="12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="28" x2="34" y2="34" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="132" y1="28" x2="126" y2="34" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="80" x2="16" y2="80" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="152" y1="80" x2="144" y2="80" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <GospelPlaceholder
      eyebrow="The Gospel · Coming Soon"
      title={
        <>
          What Does It Mean to <span className="text-[#C9A84C]">Love God?</span>
        </>
      }
      subtitle="Not a feeling. Not a rule. A response — to everything he already is and everything he has already done."
      bodyText="This study unpacks the Great Commandment from the inside out. We'll look at what love for God actually looks like in Scripture, why it begins with what God did rather than what we do, and how understanding his character makes love the only reasonable response."
      anchorVerse={<>&quot;We love because he first loved us.&quot; — 1 John 4:19</>}
      svgMotif={svgMotif}
    />
  );
}
