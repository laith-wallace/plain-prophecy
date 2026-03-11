import type { Metadata } from "next";
import CompareClient from "./CompareClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Futurism vs Historicism: Side-by-Side Comparison",
  description:
    "A rigorous side-by-side comparison of Evangelical Futurism (Dispensationalism) and Historicism — the Reformation consensus. Daniel 9 · The 1,260 Years · The Antichrist · Mark of the Beast. Scored against the same evidentiary standard.",
  alternates: {
    canonical: "https://plainprophecy.com/compare",
  },
  openGraph: {
    title: "Futurism vs Historicism: Biblical Prophecy Compared | Plain Prophecy",
    description:
      "Daniel 9, the 1260 years, and the Antichrist — how do Futurism and Historicism score against Scripture and verifiable history?",
    url: "https://plainprophecy.com/compare",
    type: "article",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Futurism vs Historicism — Plain Prophecy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Futurism vs Historicism: Biblical Prophecy Compared",
    description: "Daniel 9, the 1260 years, and the Antichrist — how do Futurism and Historicism compare?",
    images: ["/og/og-default.png"],
  },
};

const compareSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Futurism vs Historicism — A Side-by-Side Comparison",
    description:
      "A rigorous comparison of Evangelical Futurism and the Historicist Reformation consensus, evaluated across timelines, accuracy scoring, and current evidence.",
    url: "https://plainprophecy.com/compare",
    author: { "@type": "Organization", name: "Plain Prophecy" },
    publisher: {
      "@type": "Organization",
      name: "Plain Prophecy",
      logo: { "@type": "ImageObject", url: "https://plainprophecy.com/og/og-default.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://plainprophecy.com/compare" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the difference between Futurism and Historicism in biblical prophecy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Historicism, the method of the Protestant Reformation, sees the prophecies of Daniel and Revelation as unfolding across church history from the first coming of Christ to His second coming. Futurism (Dispensationalism) places most end-time prophecies in a future 7-year tribulation period. The Historicist framework was the universal Protestant consensus for over 300 years.",
        },
      },
      {
        "@type": "Question",
        name: "What are Daniel's 70 Weeks and when were they fulfilled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel 9:24-27 describes 70 prophetic weeks (490 years on the day-year principle) starting from 457 BC — the decree of Artaxerxes. This brings the Messiah's anointing to 27 AD (Jesus’ baptism), His death to 31 AD, and the end of the Jewish probationary period to 34 AD. Every data point is confirmed by independent secular chronology and archaeology.",
        },
      },
      {
        "@type": "Question",
        name: "What are the 1,260 years in Bible prophecy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Six independent Bible texts (Daniel 7:25, 12:7; Revelation 12:6, 12:14, 13:5) point to a 1,260-year period. Applied historically using the day-year principle: 538 AD (Emperor Justinian's decree establishing papal supremacy) to 1798 AD (Napoleon's capture of Pope Pius VI) equals exactly 1,260 years.",
        },
      },
      {
        "@type": "Question",
        name: "Who is the Antichrist according to the Bible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Protestant Reformers — Luther, Calvin, Tyndale, Knox, and Newton — uniformly identified the Antichrist as the papacy as a system, based on the Little Horn of Daniel 7, the Man of Sin in 2 Thessalonians 2, and the Beast of Revelation 13. This is not anti-Catholic in a personal sense; it is a historical-prophetic identification of an institutional system.",
        },
      },
    ],
  },
];

export default function ComparePage() {
  return (
    <>
      {compareSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <CompareClient />
    </>
  );
}

