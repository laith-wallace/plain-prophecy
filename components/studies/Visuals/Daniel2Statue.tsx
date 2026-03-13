"use client";

import React from "react";

interface Daniel2StatueProps {
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
}

export default function Daniel2Statue({ activeSection, onSectionSelect }: Daniel2StatueProps) {
  // Helpers to establish classes
  const getSectionClass = (sectionId: string, baseClass: string) => {
    let classes = baseClass;
    if (activeSection === sectionId) classes += " active";
    else if (activeSection !== "none") classes += " dimmed";
    return classes;
  };

  return (
    <div className="visual-wrap">
      <svg viewBox="0 0 280 640" width="100%" height="auto" style={{ maxHeight: '640px' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gold gradient */}
          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#F0D080" }} />
            <stop offset="40%" style={{ stopColor: "#C9A84C" }} />
            <stop offset="100%" style={{ stopColor: "#8A6A20" }} />
          </linearGradient>
          {/* Silver gradient */}
          <linearGradient id="grad-silver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#D8E8F0" }} />
            <stop offset="50%" style={{ stopColor: "#A8B8C8" }} />
            <stop offset="100%" style={{ stopColor: "#687888" }} />
          </linearGradient>
          {/* Bronze gradient */}
          <linearGradient id="grad-bronze" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#C88050" }} />
            <stop offset="50%" style={{ stopColor: "#A0673A" }} />
            <stop offset="100%" style={{ stopColor: "#603820" }} />
          </linearGradient>
          {/* Iron gradient */}
          <linearGradient id="grad-iron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#8A9AAA" }} />
            <stop offset="50%" style={{ stopColor: "#5A6A7A" }} />
            <stop offset="100%" style={{ stopColor: "#3A4A5A" }} />
          </linearGradient>
          {/* Iron-clay gradient */}
          <linearGradient id="grad-clay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#8A9AAA" }} />
            <stop offset="35%" style={{ stopColor: "#7A6A5A" }} />
            <stop offset="70%" style={{ stopColor: "#5A6A7A" }} />
            <stop offset="100%" style={{ stopColor: "#8A7060" }} />
          </linearGradient>
          {/* Stone gradient */}
          <linearGradient id="grad-stone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFFFFF" }} />
            <stop offset="50%" style={{ stopColor: "#E8E0D0" }} />
            <stop offset="100%" style={{ stopColor: "#C0B8A8" }} />
          </linearGradient>
        </defs>

        {/* STONE (background, below feet) */}
        <g
          className={getSectionClass("stone", "stone-section")}
          onClick={() => onSectionSelect("stone")}
        >
          {/* Rolling stone */}
          <ellipse cx="60" cy="595" rx="50" ry="28" fill="url(#grad-stone)" opacity="0.9" />
          <ellipse cx="60" cy="588" rx="44" ry="22" fill="url(#grad-stone)" />
          <text x="60" y="594" textAnchor="middle" fill="rgba(0,0,0,0.5)" fontSize="9" fontFamily="Cinzel" fontWeight="600" letterSpacing="1">STONE</text>
          {/* Trail lines suggesting motion */}
          <line x1="112" y1="580" x2="130" y2="575" stroke="rgba(232,224,208,0.3)" strokeWidth="1.5" strokeDasharray="4,3" />
          <line x1="112" y1="590" x2="135" y2="587" stroke="rgba(232,224,208,0.2)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="112" y1="599" x2="128" y2="599" stroke="rgba(232,224,208,0.15)" strokeWidth="1" strokeDasharray="3,4" />
        </g>

        {/* HEAD (Gold - Babylon) */}
        <g
          className={getSectionClass("gold", "interactive-section")}
          onClick={() => onSectionSelect("gold")}
        >
          {/* Neck */}
          <rect x="122" y="94" width="36" height="16" rx="4" fill="url(#grad-gold)" />
          {/* Head oval */}
          <ellipse cx="140" cy="68" rx="42" ry="50" fill="url(#grad-gold)" />
          {/* Crown */}
          <path d="M98,40 L108,18 L118,34 L128,12 L140,30 L152,12 L162,34 L172,18 L182,40 Z" fill="url(#grad-gold)" />
          {/* Face features */}
          <ellipse cx="126" cy="62" rx="7" ry="8" fill="rgba(0,0,0,0.2)" />
          <ellipse cx="154" cy="62" rx="7" ry="8" fill="rgba(0,0,0,0.2)" />
          <path d="M130,82 Q140,90 150,82" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />
          {/* Beard */}
          <path d="M110,80 Q140,120 170,80 L166,110 Q140,140 114,110 Z" fill="url(#grad-gold)" opacity="0.8" />
          {/* Highlight */}
          <ellipse cx="128" cy="50" rx="10" ry="8" fill="rgba(255,255,255,0.2)" transform="rotate(-20 128 50)" />
        </g>

        {/* CHEST (Silver - Medo-Persia) */}
        <g
          className={getSectionClass("silver", "interactive-section")}
          onClick={() => onSectionSelect("silver")}
        >
          {/* Torso */}
          <path d="M100,110 L80,200 L200,200 L180,110 Z" fill="url(#grad-silver)" />
          {/* Left arm */}
          <path d="M100,115 L70,125 L60,180 L85,185 L95,140 L108,130 Z" fill="url(#grad-silver)" />
          {/* Right arm */}
          <path d="M180,115 L210,125 L220,180 L195,185 L185,140 L172,130 Z" fill="url(#grad-silver)" />
          {/* Chest highlight */}
          <ellipse cx="140" cy="148" rx="25" ry="22" fill="rgba(255,255,255,0.12)" transform="rotate(-5 140 148)" />
          {/* Collar line */}
          <path d="M108,113 Q140,128 172,113" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        </g>

        {/* BELLY & THIGHS (Bronze - Greece) */}
        <g
          className={getSectionClass("bronze", "interactive-section")}
          onClick={() => onSectionSelect("bronze")}
        >
          {/* Abdomen */}
          <path d="M80,200 L84,290 L196,290 L200,200 Z" fill="url(#grad-bronze)" />
          {/* Left thigh */}
          <path d="M84,285 L74,390 L118,390 L126,285 Z" fill="url(#grad-bronze)" />
          {/* Right thigh */}
          <path d="M154,285 L162,390 L206,390 L196,285 Z" fill="url(#grad-bronze)" />
          {/* Belt/waist accent */}
          <path d="M80,200 L200,200 L200,215 L80,215 Z" fill="rgba(0,0,0,0.15)" />
          {/* Highlight */}
          <ellipse cx="140" cy="240" rx="30" ry="20" fill="rgba(255,255,255,0.08)" />
        </g>

        {/* LEGS (Iron - Rome) */}
        <g
          className={getSectionClass("iron", "interactive-section")}
          onClick={() => onSectionSelect("iron")}
        >
          {/* Left leg */}
          <path d="M74,390 L66,490 L110,490 L118,390 Z" fill="url(#grad-iron)" />
          {/* Right leg */}
          <path d="M162,390 L170,490 L214,490 L206,390 Z" fill="url(#grad-iron)" />
          {/* Knee detail left */}
          <ellipse cx="92" cy="425" rx="16" ry="12" fill="rgba(255,255,255,0.08)" />
          {/* Knee detail right */}
          <ellipse cx="188" cy="425" rx="16" ry="12" fill="rgba(255,255,255,0.08)" />
        </g>

        {/* FEET (Iron/Clay - Divided Europe) */}
        <g
          className={getSectionClass("clay", "interactive-section")}
          onClick={() => onSectionSelect("clay")}
        >
          {/* Left foot/ankle */}
          <path d="M66,490 L58,555 L112,555 L110,490 Z" fill="url(#grad-clay)" />
          {/* Foot extension left */}
          <path d="M52,540 L52,568 L118,568 L112,548 Z" fill="url(#grad-clay)" />
          {/* Right foot/ankle */}
          <path d="M170,490 L168,548 L234,568 L228,540 Z" fill="url(#grad-clay)" />
          {/* Foot extension right */}
          <path d="M168,490 L214,490 L222,555 L168,555 Z" fill="url(#grad-clay)" />
          {/* Clay patches (cracks/mottled) */}
          <circle cx="78" cy="520" r="6" fill="rgba(138,106,90,0.6)" />
          <circle cx="96" cy="535" r="4" fill="rgba(90,106,122,0.5)" />
          <circle cx="185" cy="512" r="5" fill="rgba(138,106,90,0.6)" />
          <circle cx="200" cy="530" r="7" fill="rgba(90,106,122,0.4)" />
          <circle cx="72" cy="548" r="5" fill="rgba(138,106,90,0.5)" />
          {/* Crack lines */}
          <path d="M85,490 L78,540 M100,492 L95,545 M188,493 L194,542 M205,490 L210,538" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" fill="none" />
        </g>

        {/* Section labels on statue */}
        <text x="140" y="65" textAnchor="middle" fill="rgba(0,0,0,0.4)" fontSize="8" fontFamily="Inter" fontWeight="600" letterSpacing="1.5">GOLD</text>
      </svg>
    </div>
  );
}
