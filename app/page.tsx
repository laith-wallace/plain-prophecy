import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";

// Dynamic imports for heavy client-side components to optimize bundle size and hydration
const HomeAnimations = dynamic(() => import("@/components/home/HomeAnimations"));
import ScrollHeroVideoClient from "@/components/home/ScrollHeroVideoClient";
import StudyCardDeckClient from "@/components/home/StudyCardDeckClient";
import HeroVideo from "@/components/home/HeroVideo";

import "./home-styles.css";

import {
  IconScroll,
  IconHourglass,
  IconCloud,
  IconLion,
  IconStatue,
  IconSeal,
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

const reformers = ["Luther", "Calvin", "Newton", "Wesley"];

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="home-page">
      <JsonLd schema={webSiteSchema} />
      <HomeAnimations />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="hero-section">
        {/* Background — stars always present; video layered on top on fast connections */}
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-stars" />
          <HeroVideo />
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
          <span className="hero-line hero-accent" data-hero-line="500">Plain and Simple.</span>
        </h1>

        {/* Subheadline - One thought per line rhythm */}
        <p className="hero-sub" data-hero-fade="900">
          Daniel and Revelation — decoded.
          <br className="hero-sub-br" />
          Rigorously examined.
          <br className="hero-sub-br" />
          Christ at the centre.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" data-hero-fade="1100">
          <Link href="/studies" className="btn-primary">
            Explore the Studies →
          </Link>
          <Link href="/about" className="btn-ghost">
            Our Mission
          </Link>
        </div>

        {/* Scripture badge */}
        <div className="hero-scripture" data-hero-fade="1400">
          <blockquote className="hero-quote">
            &ldquo;Here is the patience of the saints: here are they that keep
            the commandments of God, and the faith of Jesus.&rdquo;
          </blockquote>
          <cite className="hero-cite">Revelation 14:12</cite>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="scroll-chevron" />
        </div>
      </section>

      {/* ── SECTION 2: STUDIES CAROUSEL ────────────────────────────────────── */}
      <section className="studies-teaser-section">
        <div className="section-inner">
          <div className="section-header" data-animate>
            <div className="section-eyebrow">The Studies</div>
            <h2 className="section-title">Start Exploring</h2>
            <p className="section-subtitle">
              Swipe through the prophecies. Commit to an answer, then see history converge on Christ.
            </p>
          </div>
          <StudyCardDeckClient />
          <div className="studies-teaser-cta" data-animate>
            <Link href="/studies" className="btn-outline">
              View All Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SCROLL HERO VIDEO ──────────────────────────────────── */}
      <ScrollHeroVideoClient />
      {/* ── SECTION 3b: CHRIST PIVOT ─────────────────────────────────────── */}
      <section className="christ-pivot-section">
        <div className="christ-pivot-inner" data-animate>
          <div className="section-eyebrow">The Central Claim</div>
          <h2 className="christ-pivot-title">
            Every prophecy converges<br />on one Name.
          </h2>
          <blockquote className="christ-pivot-quote">
            &ldquo;For the testimony of Jesus is the spirit of prophecy.&rdquo;
          </blockquote>
          <cite className="christ-pivot-cite">Revelation 19:10</cite>
        </div>
      </section>

      {/* ── SECTION 4: PROPHECY SHOWCASE ──────────────────────────────────── */}
      <section className="prophecy-section">
        <div className="section-inner">
          <div className="section-header" data-animate>
            <div className="section-eyebrow">The Prophecies</div>
            <h2 className="section-title">Six Anchors in Scripture and History</h2>
            <p className="section-subtitle">
              Each prophecy is a precision instrument — verified by independent
              archaeology, secular chronology, and the fulfilment of centuries.
            </p>
          </div>

          <div className="prophecy-grid">
            {prophecyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href="/studies"
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

      {/* ── SECTION 5: REFORMERS BANNER ───────────────────────────────────── */}
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

      {/* ── SECTION 6: SCRIPTURE CLOSER ───────────────────────────────────── */}
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
            <Link href="/studies" className="closer-link">
              Start the Studies →
            </Link>
            <Link href="/compare" className="closer-link">
              Explore Prophecy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
