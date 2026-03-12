import GospelPlaceholder from "@/components/studies/GospelPlaceholder";

export default function JesusAtTheCentrePage() {
  const svgMotif = (
    <svg 
      width="160" 
      height="160" 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40"
    >
      {/* Central Starburst/Compass Rose */}
      {/* 4 Main Points */}
      <path d="M80 20 L88 72 L140 80 L88 88 L80 140 L72 88 L20 80 L72 72 Z" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinejoin="round" />
      
      {/* 4 Diagonal Minor Points */}
      <path d="M80 80 L115 45 M80 80 L115 115 M80 80 L45 115 M80 80 L45 45" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Central Ring */}
      <circle cx="80" cy="80" r="16" stroke="#C9A84C" strokeWidth="2" fill="#08080F" />
      
      {/* Central Dot */}
      <circle cx="80" cy="80" r="4" fill="#C9A84C" />
      
      {/* Small Outer Radiating Lines */}
      <line x1="80" y1="6" x2="80" y2="12" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="80" y1="154" x2="80" y2="148" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="80" x2="12" y2="80" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="154" y1="80" x2="148" y2="80" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <GospelPlaceholder
      eyebrow="The Gospel · Coming Soon"
      title={
        <>
          Every Prophecy Ends <span className="text-[#C9A84C]">Here</span>
        </>
      }
      subtitle="Daniel, Revelation, the whole sweep of biblical prophecy — it's all pointing at one person."
      bodyText="This study is the connective tissue of everything on Plain Prophecy. We'll show how every prophetic vision in Daniel and Revelation finds its meaning in Christ — not in geopolitics, not in end-time speculation, but in him. The statues, the beasts, the seals, the trumpets: all roads lead to Jesus."
      anchorVerse={<>&quot;These are the Scriptures that testify about me.&quot; — John 5:39</>}
      svgMotif={svgMotif}
    />
  );
}
