"use client";

import React from "react";
import Link from "next/link";

export interface GospelPlaceholderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  bodyText: string;
  anchorVerse: React.ReactNode;
  svgMotif: React.ReactNode;
}

export default function GospelPlaceholder({
  eyebrow,
  title,
  subtitle,
  bodyText,
  anchorVerse,
  svgMotif,
}: GospelPlaceholderProps) {
  return (
    <div className="min-h-[100dvh] bg-[#08080F] text-slate-200 font-sans relative overflow-hidden">
      {/* Star Field Background - Matches existing pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(circle at 50% -20%, rgba(201, 168, 76, 0.15), transparent 60%)"
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/stars.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 py-24 sm:py-32">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C]">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-[#C9A84C] text-[#C9A84C] font-normal uppercase tracking-wider text-[10px] bg-transparent">
              Study in Progress
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="relative rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden p-8 md:p-12 mb-12">
          
          <div className="relative z-10 space-y-8">
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              {bodyText}
            </p>

            {/* Christ Anchor Block */}
            <blockquote className="border-l-2 border-[#C9A84C] pl-6 py-2 my-8 text-white/90 font-serif italic text-xl md:text-2xl leading-relaxed">
              {anchorVerse}
            </blockquote>
          </div>

          {/* SVG Motif - Blurred / Frosted Overlay */}
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none mix-blend-luminosity">
            {svgMotif}
          </div>
          
          {/* Subtle gradient overlay to enhance the locked feel */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#08080F]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Email Capture Teaser */}
        <div className="text-center mb-24">
          <button 
            onClick={() => console.log("notify clicked")}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-serif text-slate-300 transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 border border-[#C9A84C]/50 rounded-full group-hover:border-[#C9A84C] transition-colors duration-300"></span>
            <span className="absolute inset-0 bg-[#C9A84C]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              Get notified when this study drops
              <span className="text-[#C9A84C] group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>

        {/* Back Link */}
        <div>
          <Link 
            href="/studies"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors font-medium text-sm"
          >
            <span>←</span> Back to Studies
          </Link>
        </div>
      </div>
    </div>
  );
}
