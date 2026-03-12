import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import HomeAnimations from "@/components/home/HomeAnimations";
import ScrollHeroVideo from "@/components/home/ScrollHeroVideo";
import { 
  IconScroll, 
  IconHourglass, 
  IconCloud, 
  IconLion, 
  IconStatue, 
  IconSeal,
  IconSeedling,
  IconScales,
  IconNewspaper,
  IconTarget
} from "@/components/icons/HeroIcons";

export const metadata: Metadata = {
  title: "Biblical Prophecy, Plain and Simple",
  description:
    "A Christ-centred, rigorous resource for understanding biblical prophecy. Discover the Reformation consensus on Daniel and Revelation — verified by history and Scripture.",
  alternates: {
    canonical: "https://plainprophecy.com",
  },
  openGraph: {
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description:
      "Discover the Reformation consensus on Daniel and Revelation — Futurism vs Historicism, rigorously compared.",
    url: "https://plainprophecy.com",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description:
      "Discover the Reformation consensus on Daniel and Revelation — rigorously compared.",
    images: ["/og/og-default.png"],
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Plain Prophecy",
  url: "https://plainprophecy.com",
  description:
    "A Christ-centred, rigorous resource for understanding biblical prophecy. Futurism vs Historicism compared through Scripture and history.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://plainprophecy.com/compare?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const prophecyCards = [
  {
    icon: IconScroll,
    title: "Daniel's 70 Weeks",
    hook: "Predicted the exact year of Christ's baptism — 500 years in advance.",
    ref: "Dan 9:24–27",
    color: "#c8a96e",
  },
  {
    icon: IconHourglass,
    title: "The 1,260 Years",
    hook: "Six Bible texts. One period. 538–1798 AD — verified to the decade.",
    ref: "Dan 7:25 · Rev 12:6",
    color: "#8b7355",
  },
  {
    icon: IconCloud,
    title: "The Second Coming",
    hook: "Not two events. One visible, audible, glorious return — every eye sees Him.",
    ref: "Rev 1:7 · 1 Thess 4:16",
    color: "#6b9eb5",
  },
  {
    icon: IconLion,
    title: "The Antichrist",
    hook: "Identified from Scripture alone by Luther, Calvin, and every Reformer.",
    ref: "Dan 7:8 · 2 Thess 2:3",
    color: "#b5756b",
  },
  {
    icon: IconStatue,
    title: "Daniel 2 — The Image",
    hook: "Four kingdoms, then God's. History confirmed every limb of the statue.",
    ref: "Dan 2:31–45",
    color: "#7b8c6e",
  },
  {
    icon: IconSeal,
    title: "The Mark of the Beast",
    hook: "Identified in history. Not a chip — a mark of allegiance in worship.",
    ref: "Rev 13:16–17",
    color: "#9b6eb5",
  },
];

const timelineNodes = [
  { year: "457 BC", label: "Ezra's Decree", ref: "Dan 9:25" },
  { year: "27 AD", label: "Messiah Anointed", ref: "Luke 3:21" },
  { year: "31 AD", label: "The Cross", ref: "Dan 9:26" },
  { year: "538 AD", label: "Papal Supremacy", ref: "Dan 7:25" },
  { year: "1798 AD", label: "Napoleon Ends It", ref: "Rev 13:3" },
  { year: "Today", label: "Signs Multiplying", ref: "Matt 24:14" },
];

const learningPaths = [
  {
    icon: IconSeedling,
    label: "I'm new to prophecy",
    desc: "See both prophetic frameworks side-by-side in 5 minutes.",
    href: "/compare",
    cta: "Compare the Frameworks →",
    accent: "var(--sda-accent)",
  },
  {
    icon: IconScales,
    label: "I know Futurism",
    desc: "10 criteria. Same evidential standard. See which system wins.",
    href: "/compare#scoring",
    cta: "See the Evidence Scores →",
    accent: "var(--futurist-primary)",
  },
  {
    icon: IconNewspaper,
    label: "Show me evidence",
    desc: "Six prophetic signs in active fulfilment — verified by mainstream news.",
    href: "/compare#evidence",
    cta: "View the Evidence →",
    accent: "#8b4513",
  },
  {
    icon: IconTarget,
    label: "Learn by doing",
    desc: "Swipe through 8 Daniel prophecies. Commit to an answer, then see history converge.",
    href: "/prophet",
    cta: "Start the Prophecies →",
    accent: "var(--sda-primary)",
  },
];

const reformers = ["Luther", "Calvin", "Newton", "Wesley"];

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="home-page">
      <JsonLd schema={webSiteSchema} />
      <HomeAnimations />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="hero-section">
        {/* Animated star/particle background */}
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-stars" />
        </div>

        {/* Decorative eyebrow */}
        <div className="hero-eyebrow" data-hero-fade="200">
          <div className="hero-rule" />
          <span>Plain Prophecy</span>
          <div className="hero-rule" />
        </div>

        {/* Main headline — two lines animate in via data-hero-line */}
        <h1 className="hero-headline">
          <span className="hero-line" data-hero-line="300">Biblical Prophecy.</span>
          <br />
          <span className="hero-line hero-accent" data-hero-line="500">Plain and Simple.</span>
        </h1>

        {/* Subheadline - One thought per line rhythm */}
        <p className="hero-sub" data-hero-fade="900">
          What the Reformers believed. 
          <br className="hero-sub-br" />
          Rigorously examined. 
          <br className="hero-sub-br" />
          Christ at the centre.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" data-hero-fade="1100">
          <Link href="/compare" className="btn-primary">
            Start Comparing →
          </Link>
          <Link href="/about" className="btn-ghost">
            Our Mission
          </Link>
        </div>

        {/* Scripture badge */}
        <div className="hero-scripture" data-hero-fade="1400">
          <blockquote className="hero-quote">
            &ldquo;Seal not the sayings of the prophecy of this book: for the
            time is at hand.&rdquo;
          </blockquote>
          <cite className="hero-cite">Revelation 22:10</cite>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="scroll-chevron" />
        </div>
      </section>

      {/* ── SECTION 2: PROPHECY SHOWCASE ──────────────────────────────────── */}
      <section className="prophecy-section">
        <div className="section-inner">
          <div className="section-header" data-animate data-animate-delay="0">
            <div className="section-eyebrow">The Prophecies</div>
            <h2 className="section-title">Six Anchors in Scripture and History</h2>
            <p className="section-subtitle">
              Each prophecy is a precision instrument — verified by independent
              archaeology, secular chronology, and the fulfilment of centuries.
            </p>
          </div>

          {/* Mobile: horizontal scroll. Desktop: 3-col grid */}
          <div className="prophecy-grid">
            {prophecyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href="/compare"
                  className="prophecy-card hover-spring"
                  data-animate
                  data-animate-delay={String(i * 80)}
                  style={{ "--card-accent": card.color } as React.CSSProperties}
                >
                  <div className="prophecy-card-icon">
                    <Icon className="icon-svg" />
                  </div>
                  <div className="prophecy-card-body">
                    <h3 className="prophecy-card-title">{card.title}</h3>
                    <p className="prophecy-card-hook">{card.hook}</p>
                    <div className="prophecy-card-ref">{card.ref}</div>
                  </div>
                  <div className="prophecy-card-arrow" aria-hidden="true">→</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: TIMELINE TEASER ────────────────────────────────────── */}
      <section className="timeline-section">
        <div className="section-inner">
          <div className="section-header" data-animate>
            <div className="section-eyebrow">The Prophetic Record</div>
            <h2 className="section-title">History Locked in Advance</h2>
          </div>

          <div className="timeline-track" role="list">
            {timelineNodes.map((node, i) => (
              <div
                key={node.year}
                className="timeline-node"
                role="listitem"
                data-animate
                data-animate-delay={String(i * 120)}
              >
                <div className="timeline-dot" />
                {i < timelineNodes.length - 1 && (
                  <div className="timeline-line" />
                )}
                <div className="timeline-year">{node.year}</div>
                <div className="timeline-label">{node.label}</div>
                <div className="timeline-ref">{node.ref}</div>
              </div>
            ))}
          </div>

          <div className="timeline-cta" data-animate>
            <Link href="/compare" className="btn-outline">
              See the Full Timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SCROLL HERO VIDEO ──────────────────────────────────── */}
      <ScrollHeroVideo />

      {/* ── SECTION 5: LEARNING PATHS ─────────────────────────────────────── */}
      <section className="paths-section">
        <div className="section-inner">
          <div className="section-header" data-animate>
            <div className="section-eyebrow">Where to Begin</div>
            <h2 className="section-title">Start Here</h2>
          </div>

          <div className="paths-grid">
            {learningPaths.map((path, i) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.label}
                  href={path.href}
                  className="path-card hover-spring"
                  data-animate
                  data-animate-delay={String(i * 80)}
                  style={{ "--path-accent": path.accent } as React.CSSProperties}
                >
                  <div className="path-icon">
                    <Icon className="icon-svg" />
                  </div>
                  <div className="path-label">{path.label}</div>
                  <p className="path-desc">{path.desc}</p>
                  <div className="path-cta" aria-hidden="true">{path.cta}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: REFORMERS BANNER ───────────────────────────────────── */}
      <section className="reformers-section">
        {/* Typographic watermark texture */}
        <div className="reformers-watermark" aria-hidden="true">
          {reformers.map((name) => (
            <span key={name} className="reformers-name">
              {name}
            </span>
          ))}
        </div>

        <div className="reformers-content" data-animate>
          <div className="section-eyebrow reformers-eyebrow">
            The Reformation Consensus
          </div>
          <h2 className="reformers-title">
            Luther, Calvin, Newton, and Wesley All Agreed
          </h2>
          <p className="reformers-body">
            The Historicist reading of Daniel and Revelation was the dominant 
            Protestant position for 300 years — a legacy of rigorous scholarship 
            and Christ-centred clarity.
          </p>
          <Link href="/compare" className="btn-accent">
            See the Full Comparison →
          </Link>
        </div>
      </section>

      {/* ── SECTION 7: SCRIPTURE CLOSER ───────────────────────────────────── */}
      <section className="closer-section">
        <div className="closer-inner" data-animate>
          <div className="closer-rule" aria-hidden="true" />
          <blockquote className="closer-quote">
            &ldquo;He that hath an ear, let him hear what the Spirit saith
            unto the churches.&rdquo;
          </blockquote>
          <cite className="closer-cite">Revelation 2:7</cite>
          <div className="closer-rule" aria-hidden="true" />
          <div className="closer-links">
            <Link href="/compare" className="closer-link">
              Explore Prophecy →
            </Link>
            <Link href="/prophet" className="closer-link">
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
