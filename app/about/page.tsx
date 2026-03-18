import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About — Mission & Hermeneutical Principles",
  description:
    "Plain Prophecy is a Christ-centred, biblical prophecy resource. Grounded in the Reformation consensus, Scripture-first methodology, and intellectual honesty. Our mission, principles, and what makes this site different.",
  alternates: {
    canonical: "https://plainprophecy.com/about",
  },
  openGraph: {
    title: "About Plain Prophecy — Mission & Method",
    description: "Christ-centred, biblical accurate and historical. Not sensationalism. Just Scripture and verifiable history.",
    url: "https://plainprophecy.com/about",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Plain Prophecy — About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Plain Prophecy — Mission & Method",
    description: "Christ-centred, biblical accurate and historical. Not sensationalism. Just Scripture and verifiable history.",
    images: ["/og/og-default.png"],
  },
};

const aboutSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Plain Prophecy",
    url: "https://plainprophecy.com/about",
    description:
      "Plain Prophecy is a Christ-centred, biblical prophecy resource grounded in the Reformation consensus and Scripture-first methodology.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://plainprophecy.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://plainprophecy.com/about" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plain Prophecy",
    url: "https://plainprophecy.com",
    logo: "https://plainprophecy.com/og/og-default.png",
    description:
      "A Christ-centred resource for understanding biblical prophecy rigorously — without sensationalism as the goal is to produce faithfulness not fear and a deeper love for Jesus Christ.",
    foundingDate: "2024",
    sameAs: [],
  },
];

const principles = [
  {
    num: "01",
    title: "Scripture Interprets Scripture",
    desc: "We never force a conclusion back into a text. The day-year principle is explicitly mandated (Num 14:34; Ezek 4:6) — not invented. Any prophetic anchor must be verifiable from the Bible itself before being checked against history.",
  },
  {
    num: "02",
    title: "History Verifies Prophecy",
    desc: "Genuine prophecy must have verifiable fulfilments independent of denominational tradition. We cite archaeology, secular chronology, and peer-reviewed history — not just church commentary. Every date is checked.",
  },
  {
    num: "03",
    title: "Christ at the Centre",
    desc: "Every prophetic period anchors to who Jesus is: the Messiah of 457 BC, the Sacrifice of 31 AD, the risen High Priest of 1844, the Coming King. Prophecy is not a news ticker — it is Christology unfolded in time.",
  },
  {
    num: "04",
    title: "Intellectual Honesty",
    desc: "We acknowledge where the Historicist position carries genuine scholarly debate. A 9/10 is not a failure — it reflects where additional inference is required. We score both traditions against the same evidentiary standard.",
  },
];

export default function AboutPage() {
  return (
    <>
      {aboutSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>
      {/* Header */}

      <div style={{ borderBottom: "3px double var(--ink)", paddingBottom: "2rem", marginBottom: "3rem" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.75rem" }}>
          Mission
        </div>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          About Plain Prophecy
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--neutral)", maxWidth: 640 }}>
          A Christ-centred resource for understanding biblical prophecy rigorously — without sensationalism as the goal is to produce faithfulness not fear and a deeper love for Jesus Christ.
        </p>
      </div>

      {/* Meet Laith */}
      <section
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          marginBottom: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexShrink: 0, width: "clamp(140px, 30%, 200px)" }}>
          <Image
            src="/laith-speaker.jpg"
            alt="Laith — speaker and creator of Plain Prophecy"
            width={400}
            height={500}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            priority
          />
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.5rem" }}>
            The Person Behind It
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>
            Hi, I&apos;m Laith
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", lineHeight: 1.8, color: "#3a3530" }}>
            <p>
              I&apos;m a speaker, designer, and teacher — and sharing the Bible with people is one of the things I love most. I&apos;ve been an elder in my church for over ten years.
            </p>
            <p>
              I built Plain Prophecy for my children. I wanted them to have somewhere they could go to actually understand how to read prophecy — not to be scared by it, but to see Jesus in it. That&apos;s the whole point.
            </p>
            <p>
              If you find it useful too, that&apos;s everything I could hope for.
            </p>
          </div>
        </div>
      </section>

      {/* What this is */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>
          What Plain Prophecy Is
        </h2>
        <div style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#3a3530", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p>
            Most prophecy resources fall into one of two traps: they&apos;re either sensationalist end-times platforms that generate anxiety rather than understanding, or they&apos;re denomination-marketing tools where the conclusion is determined before the evidence is examined.
          </p>
          <p>
            Plain Prophecy exists to do neither. We take the Historicist framework — the prophetic method of the entire Protestant Reformation — and examine it the way a historian would: by checking every claim against independent evidence, acknowledging where interpretive steps require inference, and keeping Christ at the centre of every timeline.
          </p>
          <p>
            The Historicist reading of Daniel and Revelation was the consensus of Luther, Calvin, Tyndale, Knox, Newton, Wesley, and every major Reformer for nearly 300 years. Evangelical futurism is an 1830s innovation with origins in Jesuit Counter-Reformation polemic. The evidence is not close — but we let it speak for itself.
          </p>
        </div>
      </section>

      {/* What this is NOT */}
      <section
        style={{
          marginBottom: "3rem",
          background: "var(--cream-mid)",
          border: "2px solid var(--divider)",
          padding: "1.75rem",
        }}
      >
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
          What Plain Prophecy Is Not
        </h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "1.25rem" }}>
          {[
            "Not a fear platform — prophecy understood correctly produces faithfulness, not anxiety",
            "Not sensationalist — we don't assign current world leaders to prophetic roles",
            "Not infallible — we acknowledge genuine scholarly debate wherever it exists",
            "Not people focused — the prophetic analysis applies to institutional systems, not individuals",
          ].map((item, i) => (
            <li key={i} style={{ fontSize: "0.87rem", lineHeight: 1.6, color: "#3a3530" }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Hermeneutical Principles */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.5rem" }}>
          Method
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Hermeneutical Principles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {principles.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1.25rem",
                border: "1px solid var(--divider)",
                padding: "1.25rem",
                background: i % 2 === 1 ? "var(--cream-mid)" : "var(--paper)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  opacity: 0.2,
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: 36,
                }}
              >
                {p.num}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-ibm-plex-sans)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.35rem" }}>
                  {p.title}
                </div>
                <p style={{ fontSize: "0.84rem", lineHeight: 1.65, color: "#3a3530" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key texts */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.5, marginBottom: "1rem" }}>
          The Central Texts
        </div>
        <div style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.8, opacity: 0.85 }}>
          Dan 8:14 · Dan 9:24–27 · Dan 7:25 · Rev 12:6, 14 · Rev 13:5 · Rev 14:6–12 · Rev 17–18 · Rev 20 · Heb 8–9
        </div>
      </section>
    </main>
    </>
  );
}

