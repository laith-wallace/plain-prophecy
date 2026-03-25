"use client";

import dynamic from "next/dynamic";
// CSS travels with the component — any page that drops in <StudyCardCarousel>
// gets the card styles automatically, without needing to import studies-index.css itself.
import "@/app/studies-index.css";

const StudyCardDeck = dynamic(
  () => import("@/components/studies/StudyCardDeck"),
  { ssr: false }
);

interface StudyCardCarouselProps {
  /** Filter to a single book slug ("gospel" | "daniel" | "revelation") or "all" */
  bookFilter?: string;
}

export default function StudyCardCarousel({ bookFilter = "all" }: StudyCardCarouselProps) {
  return <StudyCardDeck bookFilter={bookFilter} />;
}
